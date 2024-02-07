'use strict'


import { QueryResult, PoolClient, Pool } from 'pg'
import { hash } from 'bcryptjs'

import PatientRepository from '../../domain/Patient.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CheckUsernameExistsInterface } from '../../domain/interfaces/CheckUsernameExists.interface'
import { CreatePatientInterface, CreatePatientResultInterface } from '../../domain/interfaces/CreatePatient.interface'
import { ReadPatientsInterface, ReadPatientsResultInterface } from '../../domain/interfaces/ReadPatients.interface'
import { ReadPatientInterface, ReadPatientResultInterface } from '../../domain/interfaces/ReadPatient.interface'
import { ReadPhotoKeyInterface, ReadPhotoKeyResultInterface } from '../../domain/interfaces/ReadPhotoKey.interface'
import { ReadPatientsStatisticsInterface, ReadPatientsStatisticsResultInterface } from '../../domain/interfaces/ReadPatientsStatistics.interface'
import { UpdatePatientInterface } from '../../domain/interfaces/UpdatePatient.interface'
import { UpdatePhotoInterface } from '../../domain/interfaces/UpdatePhoto.interface'

import checkPlanTransaction from './transactions/checkPlan.transaction'
import checkUsernameExistsQuery from './querys/checkUsernameExists.query'
import createPatientTransaction from './transactions/createPatient.transaction'
import createExamsTransactions from './transactions/createExams.transactions'
import readPatientsQuery from './querys/readPatients.query'
import readPatientQuery from './querys/readPatient.query'
import readPhotoKeyQuery from './querys/readPhotoKey.query'
import readPatientsStatisticsQuery from './querys/readPatientsStatistics.query'
import updatePatientTransaction from './transactions/updatePatient.transaction'
import updatePhotoQuery from './querys/updatePhoto.query'


export default class PatientModel implements PatientRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly salt: number,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const values = [data.idClinic]
            const [selectAppPlan, selectCountPatients] = checkPlanTransaction
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            console.log(selectAppPlanResult.rows)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountPatientsResult: QueryResult = await this.db().query(selectCountPatients, values)
            const availablePatients = Number(selectAppPlanResult.rows[0].patients)
            const patientsCreated = Number(selectCountPatientsResult.rows[0].total_patients)
            if(availablePatients === -1) {
                return true
            }
            if(patientsCreated >= availablePatients) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: PatientModel.checkPlan')
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
    async createPatient(data: CreatePatientInterface): Promise<CreatePatientResultInterface> {
        let client: PoolClient = await this.db().connect()
        try {
            const [insertSmAccount, insertSmPatient, insertSmRecord] = createPatientTransaction
            const passwordCrypt: string = await hash(data.password, this.salt)
            await client.query('BEGIN')

            const values1 = [
                data.firstName,
                data.lastName,
                data.username,
                passwordCrypt,
                data.photo
            ]
            const insertSmAccountResult: QueryResult = await client.query(insertSmAccount, values1)
            const idSmAccount = insertSmAccountResult.rows[0].id

            const values2 = [
                data.email,
                data.phonePrefix,
                data.phone,
                data.fullAddress,
                data.workplace,
                data.recommendedBy,
                data.birthDate,
                data.emergencyPhonePrefix,
                data.emergencyPhone,
                data.emergencyName,
                data.idAppGender,
                data.idAppCountry,
                idSmAccount,
                data.idSmCollaborator,
                data.idSmClinic
            ]
            const insertSmPatientResult: QueryResult = await client.query(insertSmPatient, values2)
            const idPatient = insertSmPatientResult.rows[0].id

            const values3 = [idPatient]
            await client.query(insertSmRecord, values3)

            //exams
            const [insertSmBacterialPlaque, insertSmOdontogram, insertSmPeriodontogram, insertSmOrthodontics, insertSmEndodontics, insertSmEndodonticsTeeth, insertSmAtm] = createExamsTransactions
            await client.query(insertSmBacterialPlaque, values3)
            await client.query(insertSmOdontogram, values3)
            await client.query(insertSmPeriodontogram, values3)
            await client.query(insertSmOrthodontics, values3)
            await client.query(insertSmEndodontics, values3)
            await client.query(insertSmEndodonticsTeeth, values3)
            await client.query(insertSmAtm, values3)
            //

            await client.query('COMMIT')
            const modelResult: CreatePatientResultInterface = {
                success: true,
                id: idPatient
            }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: PatientModel.createPatient')
            throw error
        }
        finally {
            client.release()
        }
    }
    async readPatients(data: ReadPatientsInterface): Promise<ReadPatientsResultInterface[]> {
        try {
            const values = [data.idClinic]
            const readPatientsQueryResult: QueryResult = await this.db().query(readPatientsQuery, values)
            const patients = readPatientsQueryResult.rows.map(element => {
                const newElement: ReadPatientsResultInterface = {
                    id: element.id,
                    firstName: element.first_name,
                    lastName: element.last_name,
                    username: element.username,
                    photo: element.photo,
                    email: element.email,
                    phonePrefix: element.phone_prefix,
                    phone: element.phone,
                    fullAddress: element.full_address,
                    createdAt: element.as_created_at,
                    gender: element.gender_name,
                    country: element.country_name
                }
                return newElement
            })
            return patients
        } catch (error) {
            console.error('ERROR -- MODEL: PatientModel.readPatients')
            throw error
        }
    }
    async readPatient(data: ReadPatientInterface): Promise<ReadPatientResultInterface> {
        try {
            const values = [data.id]
            const readPatientQueryResult: QueryResult = await this.db().query(readPatientQuery, values)
            if(this.checkSelect(readPatientQueryResult)) {
                const patient = readPatientQueryResult.rows[0]
                const modelResult: ReadPatientResultInterface = {
                    success: true,
                    id: patient.id,
                    firstName: patient.first_name,
                    lastName: patient.last_name,
                    username: patient.username,
                    photo: patient.photo,
                    email: patient.email,
                    phonePrefix: patient.phone_prefix,
                    phone: patient.phone,
                    fullAddress: patient.full_address,
                    workplace: patient.workplace,
                    recommendedBy: patient.recommended_by,
                    birthDate: patient.as_birth_date,
                    emergencyPhonePrefix: patient.emergency_phone_prefix,
                    emergencyPhone: patient.emergency_phone,
                    emergencyName: patient.emergency_name,
                    createdAt: patient.as_created_at,
                    gender: patient.gender_name,
                    idAppGender: patient.as_id_gender,
                    country: patient.country_name,
                    idAppCountry: patient.as_id_country,
                    doctorName: patient.as_doctor_name,
                    doctorUsername: patient.as_doctor_username,
                    idSmCollaborator: patient.as_id_sm_collaborator,
                    idSmClinic: patient.as_id_sm_clinic
                }
                return modelResult
            }
            const modelResult: ReadPatientResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: PatientModel.readPatient')
            throw error
        }
    }
    async readPhotoKey(data: ReadPhotoKeyInterface): Promise<ReadPhotoKeyResultInterface> {
        try {
            const values = [data.id]
            const readPhotoKeyQueryResult: QueryResult = await this.db().query(readPhotoKeyQuery, values)
            if(this.checkSelect(readPhotoKeyQueryResult)) {
                const patient = readPhotoKeyQueryResult.rows[0]
                const modelResult: ReadPhotoKeyResultInterface = {
                    success: true,
                    photo: patient.photo
                }
                return modelResult
            }
            const modelResult: ReadPhotoKeyResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: PatientModel.readPhotoKey')
            throw error
        }
    }
    async readPatientsStatistics(data: ReadPatientsStatisticsInterface): Promise<ReadPatientsStatisticsResultInterface> {
        try {
            const values = [data.id]
            const readPatientsStatisticsQueryResult: QueryResult = await this.db().query(readPatientsStatisticsQuery, values)
            const modelResul: ReadPatientsStatisticsResultInterface = {
                success: false,
                graphPatients: readPatientsStatisticsQueryResult.rows.map(element => element.patients)
            }
            return modelResul
        } catch (error) {
            console.error('ERROR -- MODEL: PatientModel.ReadPatientsStatistics')
            throw error
        }
    }
    async updatePatient(data: UpdatePatientInterface): Promise<boolean> {
        let client: PoolClient = await this.db().connect()
        try {
            const [updateSmAccount, updateSmPatient] = updatePatientTransaction
            await client.query('BEGIN')

            const values1 = [
                data.firstName,
                data.lastName,
                data.id
            ]
            await client.query(updateSmAccount, values1)

            const values2 = [
                data.email,
                data.phonePrefix,
                data.phone,
                data.fullAddress,
                data.workplace,
                data.recommendedBy,
                data.birthDate,
                data.emergencyPhonePrefix,
                data.emergencyPhone,
                data.emergencyName,
                data.idAppGender,
                data.idAppCountry,
                data.idSmCollaborator,
                data.id
            ]
            await client.query(updateSmPatient, values2)

            await client.query('COMMIT')
            return true
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: PatientModel.updatePatient')
            throw error
        }
        finally {
            client.release()
        }
    }
    async updatePhoto(data: UpdatePhotoInterface): Promise<boolean> {
        try {
            const values = [
                data.photo,
                data.id
            ]
            const updatePhotoQueryResult: QueryResult = await this.db().query(updatePhotoQuery, values)
            return this.checkInsert(updatePhotoQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PatientModel.updatePhoto')
            throw error
        }
    }
}