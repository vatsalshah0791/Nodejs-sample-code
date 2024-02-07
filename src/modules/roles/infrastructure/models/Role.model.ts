'use strict'


import { QueryResult, Pool } from 'pg'

import RoleRepository from '../../domain/Role.repository'

import { ReadRolesResultInterface } from '../../domain/interfaces/ReadRoles.interface'

import readRolesAllQuery from './querys/readRolesAll.query'
import readRolesCollaboratorsQuery from './querys/readRolesCollaborators.query'


export default class RoleModel implements RoleRepository {
    constructor(private readonly db: () => Pool) {}
    async readRolesAll(): Promise<ReadRolesResultInterface[]> {
        try {
            const readRolesAllQueryResult: QueryResult = await this.db().query(readRolesAllQuery)
            const roles = readRolesAllQueryResult.rows.map(element => {
                const newElement: ReadRolesResultInterface = {
                    id: element.id,
                    roleName: element.role_name
                }
                return newElement
            })
            return roles
        } catch (error) {
            console.error('ERROR -- MODEL: RoleModel.readRolesAll')
            throw error
        }
    }
    async readRollesCollaboratos(): Promise<ReadRolesResultInterface[]> {
        try {
            const readRolesCollaboratorsQueryResult: QueryResult = await this.db().query(readRolesCollaboratorsQuery)
            const roles = readRolesCollaboratorsQueryResult.rows.map(element => {
                const newElement: ReadRolesResultInterface = {
                    id: element.id,
                    roleName: element.role_name
                }
                return newElement
            })
            return roles
        } catch (error) {
            console.error('ERROR -- MODEL: RoleModel.readRollesCollaboratos')
            throw error
        }
    }
}