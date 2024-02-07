'use strict'


import { QueryResult, PoolClient, Pool } from 'pg'

import PermissionRepository from '../../domain/Permissions.repository'

import { CheckPermissionsInterface } from '../../domain/interfaces/CheckPermissions.interface'
import { AdminReadPermissionsInterface, CollaboratorReadPermissionsInterface, ReadPermissionsResultInterface } from '../../domain/interfaces/ReadPermissions.interface'
import { UpdatePermissionInterface } from '../../domain/interfaces/UpdatePermission.interface'

import checkPermissionsCanReadQuery from './querys/checkPermissionsCanRead.query'
import checkPermissionsCanWriteQuery from './querys/checkPermissionsCanWrite.query'
import adminReadPermissionsQuery from './querys/adminReadPermissions.query'
import collaboratorReadPermissionsQuery from './querys/collaboratorReadPermissions.query'
import updatePermissionTransactions from './transactions/updatePermission.transactions'


export default class PermissionModel implements PermissionRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean,
    ) {}
    async checkPermissionsCanRead(data: CheckPermissionsInterface): Promise<boolean> {
        try {
            const values = [
                data.idAccount,
                data.idSection
            ]
            const selectSmPermissionResult: QueryResult = await this.db().query(checkPermissionsCanReadQuery, values)
            return this.checkSelect(selectSmPermissionResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PermissionModel.checkPermissionsCanRead')
            throw error
        }
    }
    async checkPermissionsCanWrite(data: CheckPermissionsInterface): Promise<boolean> {
        try {
            const values = [
                data.idAccount,
                data.idSection
            ]
            const selectSmPermissionResult: QueryResult = await this.db().query(checkPermissionsCanWriteQuery, values)
            return this.checkSelect(selectSmPermissionResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PermissionModel.checkPermissionsCanWrite')
            throw error
        }
    }
    async adminReadPermissions(data: AdminReadPermissionsInterface): Promise<ReadPermissionsResultInterface[]> {
        try {
            const values = [data.id]
            const adminReadPermissionsQueryResult: QueryResult = await this.db().query(adminReadPermissionsQuery, values)
            const permissions = adminReadPermissionsQueryResult.rows.map(element => {
                const newElement: ReadPermissionsResultInterface = {
                    idSection: element.id_app_section,
                    sectionName: element.section_name,
                    canRead: element.as_can_read,
                    canWrite: element.as_can_write
                }
                return newElement
            })
            return permissions
        } catch (error) {
            console.error('ERROR -- MODEL: PermissionModel.adminReadPermissions')
            throw error
        }
    }
    async collaboratorReadPermissions(data: CollaboratorReadPermissionsInterface): Promise<ReadPermissionsResultInterface[]> {
        try {
            const values = [data.idAccount]
            const collaboratorReadPermissionsQueryResult: QueryResult = await this.db().query(collaboratorReadPermissionsQuery, values)
            const permissions = collaboratorReadPermissionsQueryResult.rows.map(element => {
                const newElement: ReadPermissionsResultInterface = {
                    idSection: element.id_app_section,
                    sectionName: element.section_name,
                    canRead: element.as_can_read,
                    canWrite: element.as_can_write
                }
                return newElement
            })
            return permissions
        } catch (error) {
            console.error('ERROR -- MODEL: PermissionModel.collaboratorReadPermissions')
            throw error
        }
    }
    async updatePermission(data: UpdatePermissionInterface): Promise<boolean> {
        let client: PoolClient = await this.db().connect()
        try {
            const [selectSmPermission, updateSmPermission, insertSmPermission] = updatePermissionTransactions
            const values1 = [
                data.idSmCollaborator,
                data.idAppSection
            ]
            await client.query('BEGIN')
            const selectSmPermissionResult: QueryResult = await client.query(selectSmPermission, values1)
            const values2 = [
                data.canRead,
                data.canWrite,
                data.idSmCollaborator,
                data.idAppSection
            ]
            if(this.checkSelect(selectSmPermissionResult)) {
                const updateSmPermissionResult: QueryResult = await client.query(updateSmPermission, values2)
                if(!this.checkInsert(updateSmPermissionResult)) {
                    console.log(updateSmPermissionResult.rows)
                    await client.query('ROLLBACK')
                    return false
                }
                await client.query('COMMIT')
                return true
            }
            const insertSmPermissionResult: QueryResult = await client.query(insertSmPermission, values2)
            if(!this.checkInsert(insertSmPermissionResult)) {
                await client.query('ROLLBACK')
                return false
            }
            await client.query('COMMIT')
            return true
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: PermissionModel.updatePermission')
            throw error
        }
        finally {
            client.release()
        }
    }
}