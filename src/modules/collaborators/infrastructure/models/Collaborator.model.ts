'use strict'


import { QueryResult, PoolClient, Pool } from 'pg'
import { hash } from 'bcryptjs'

import CollaboratorRepository from '../../domain/Collaborator.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CheckUsernameExistsInterface } from '../../domain/interfaces/CheckUsernameExists.interface'
import { CheckClinicalAssignmentExistsInterface } from '../../domain/interfaces/CheckClinicalAssignmentExists.interface'
import { CreateCollaboratorInterface, CreateCollaboratorResultInterface } from '../../domain/interfaces/CreateCollaborator.interface'
import { ReadCollaboratorsInterface, ReadCollaboratorsResultInterface } from '../../domain/interfaces/ReadCollaborators.interface'
import { ReadCollaboratorInterface, ReadCollaboratorResultInterface } from '../../domain/interfaces/ReadCollaborator.interface'
import { ReadAssignedByClinicInterface, ReadAssignedByClinicResultInterface } from '../../domain/interfaces/ReadAssignedByClinic.interface'
import { ReadUnassignedByClinicInterface, ReadUnassignedByClinicResultInterface } from '../../domain/interfaces/ReadUnassignedByClinic.interface'
import { AssingClinicInterface, AssingClinicResultInterface } from '../../domain/interfaces/AssingClinic.interface'

import checkPlanCollaboratorTransaction from './transactions/checkPlanCollaborator.transaction'
import checkUsernameExistsQuery from './querys/checkUsernameExists.query'
import checkClinicalAssignmentExistsQuery from './querys/checkClinicalAssignmentExists.query'
import createCollaboratorTransaction from './transactions/createCollaborator.transaction'
import readCollaboratorsQuery from './querys/readCollaborators.query'
import readCollaboratorQuery from './querys/readCollaborator.query'
import readAssignedByClinicQuery from './querys/readAssignedByClinic.query'
import readUnassignedByClinicQuery from './querys/readUnassignedByClinic.query'
import assingClinicQuery from './querys/assingClinic.query'


export default class CollaboratorModel implements CollaboratorRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly salt: number,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const [selectAppPlan, selectCountCollaborators] = checkPlanCollaboratorTransaction
            const values = [data.idAccount]
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountCollaboratorsResult: QueryResult = await this.db().query(selectCountCollaborators, values)
            const availableCollaborators = selectAppPlanResult.rows[0].collaborators
            const collaboratorsCreated = selectCountCollaboratorsResult.rows[0].total_collaborators
            if(availableCollaborators === -1) {
                return true
            }
            if(collaboratorsCreated >= availableCollaborators) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.checkPlan')
            throw error
        }
    }
    async checkUsernameExists(data: CheckUsernameExistsInterface): Promise<boolean> {
        try {
            const values = [data.username]
            const checkUsernameExistsQueryResult: QueryResult = await this.db().query(checkUsernameExistsQuery, values)
            return this.checkSelect(checkUsernameExistsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.checkUsernameExists')
            throw error
        }
    }
    async checkClinicalAssignmentExists(data: CheckClinicalAssignmentExistsInterface): Promise<boolean> {
        try {
            const values = [
                data.idCollaborator,
                data.idClinic
            ]
            const checkClinicalAssignmentExistsQueryResult: QueryResult = await this.db().query(checkClinicalAssignmentExistsQuery, values)
            return this.checkSelect(checkClinicalAssignmentExistsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.checkClinicalAssignmentExists')
            throw error
        }
    }
    async createCollaborator(data: CreateCollaboratorInterface): Promise<CreateCollaboratorResultInterface> {
        let client: PoolClient = await this.db().connect()
        try {
            const [insertSmAccount, insertSmCollaborator, insertSmPermission, insertSmAdminNotification] = createCollaboratorTransaction
            const passwordCrypt: string = await hash(data.password, this.salt)
            await client.query('BEGIN')
            const values1 = [
                data.firstName,
                data.lastName,
                data.username,
                passwordCrypt,
                data.photo,
                data.idAppRole
            ]
            const insertSmAccountResult: QueryResult = await client.query(insertSmAccount, values1)

            const values2 = [
                data.email,
                data.phonePrefix,
                data.phone,
                data.fullAddress,
                data.birthDate,
                data.emergencyPhonePrefix,
                data.emergencyPhone,
                data.emergencyName,
                data.idAppGender,
                data.idAppCountry,
                insertSmAccountResult.rows[0].id,
                data.idAccount
            ]
            const insertSmCollaboratorResult: QueryResult = await client.query(insertSmCollaborator, values2)
            const idCollaborator = insertSmCollaboratorResult.rows[0].id

            const values3 = [idCollaborator]
            await client.query(insertSmPermission, values3)

            const values4 = [
                'COLLABORATOR',
                `The Collaborator ${data.firstName} ${data.lastName}, has been created`,
                data.idAccount
            ]
            await client.query(insertSmAdminNotification, values4)

            await client.query('COMMIT')
            const modelResult: CreateCollaboratorResultInterface = {
                success: true,
                id: idCollaborator
            }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: CollaboratorModel.createCollaborator')
            throw error
        }
        finally {
            client.release()
        }
    }
    async readCollaborators(data: ReadCollaboratorsInterface): Promise<ReadCollaboratorsResultInterface[]> {
        try {
            const values = [
                data.selectIdAppRole,
                data.idAccount
            ]
            const readCollaboratorsQueryResult: QueryResult = await this.db().query(readCollaboratorsQuery, values)
            const collaborators = readCollaboratorsQueryResult.rows.map(element => {
                const newElement: ReadCollaboratorsResultInterface = {
                    id: element.as_id_sm_collaborator,
                    firstName: element.first_name,
                    lastName: element.last_name,
                    username: element.username,
                    email: element.email,
                    phonePrefix: element.phone_prefix,
                    phone: element.phone,
                    isActive: element.is_active,
                    photo: element.photo,
                    role: element.role_name
                }
                return newElement
            })
            return collaborators
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.readCollaborators')
            throw error
        }
    }
    async readCollaborator(data: ReadCollaboratorInterface): Promise<ReadCollaboratorResultInterface> {
        try {
            const values = [data.id]
            const readCollaboratorQueryResult: QueryResult = await this.db().query(readCollaboratorQuery, values)
            if(this.checkSelect(readCollaboratorQueryResult)) {
                const collaborator = readCollaboratorQueryResult.rows[0]
                const modelResult: ReadCollaboratorResultInterface = {
                    success: true,
                    id: collaborator.as_id_sm_collaborator,
                    firstName: collaborator.first_name,
                    lastName: collaborator.last_name,
                    username: collaborator.username,
                    photo: collaborator.photo,
                    isActive: collaborator.is_active,
                    createdAt: collaborator.as_created_at,
                    email: collaborator.email,
                    phonePrefix: collaborator.phone_prefix,
                    phone: collaborator.phone,
                    fullAddress: collaborator.full_address,
                    birthDate: collaborator.as_birth_date,
                    emergencyPhonePrefix: collaborator.emergency_phone_prefix,
                    emergencyPhone: collaborator.emergency_phone,
                    emergencyName: collaborator.emergency_name,
                    role: collaborator.role_name,
                    gender: collaborator.gender_name,
                    idAppGender: collaborator.id_app_gender,
                    country: collaborator.country_name,
                    idAppCountry: collaborator.id_app_country
                }
                return modelResult
            }
            const modelResult: ReadCollaboratorResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.readCollaborator')
            throw error
        }
    }
    async readAssignedByClinic(data: ReadAssignedByClinicInterface): Promise<ReadAssignedByClinicResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.selectIdAppRole
            ]
            const readAssignedByClinicQueryResult: QueryResult = await this.db().query(readAssignedByClinicQuery, values)
            const doctors = readAssignedByClinicQueryResult.rows.map(element => {
                const newElement: ReadAssignedByClinicResultInterface = {
                    id: element.id,
                    firstName: element.first_name,
                    lastName: element.last_name,
                    username: element.username,
                    photo: element.photo,
                    isActive: element.is_active,
                    email: element.email,
                    phonePrefix: element.phone_prefix,
                    phone: element.phone,
                    salary: element.salary,
                    commission: element.commission,
                    role: element.role_name
                }
                return newElement
            })
            return doctors
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.readAssignedByClinic')
            throw error
        }
    }
    async readUnassignedByClinic(data: ReadUnassignedByClinicInterface): Promise<ReadUnassignedByClinicResultInterface[]> {
        try {
            const readSmCollaboratorSmClinic: QueryResult = await this.db().query(
                readUnassignedByClinicQuery,
                [
                    data.idClinic,
                    data.selectIdAppRole
                ]
            )
            const doctors = readSmCollaboratorSmClinic.rows.map(element => {
                const newElement: ReadUnassignedByClinicResultInterface = {
                    id: element.id,
                    firstName: element.first_name,
                    lastName: element.last_name,
                    username: element.username,
                    photo: element.photo,
                    isActive: element.is_active,
                    email: element.email,
                    phonePrefix: element.phone_prefix,
                    phone: element.phone,
                    role: element.role_name
                }
                return newElement
            })
            return doctors
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.readUnassignedByClinic')
            throw error
        }
    }
    async assingClinic(data: AssingClinicInterface): Promise<AssingClinicResultInterface> {
        try {
            const values = [
                data.salary,
                data.commission,
                data.idCollaborator,
                data.idClinic
            ]
            const assingClinicQueryResult: QueryResult = await this.db().query(assingClinicQuery, values)
            if(this.checkInsert(assingClinicQueryResult)) {
                const modelResult: AssingClinicResultInterface = {
                    success: true,
                    id: assingClinicQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: AssingClinicResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorModel.assingClinic')
            throw error
        }
    }
}