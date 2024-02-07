'use strict'


import { QueryResult, PoolClient, Pool } from 'pg'

import ClinicRepository from '../../domain/Clinic.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CreateClinicInterface, CreateClinicResultInterface } from '../../domain/interfaces/CreateClinic.interface'
import { ReadClinicInterface, ReadClinicResultInterface } from '../../domain/interfaces/ReadClinic.interface'
import { ReadClinicsInterface, ReadClinicsResultInterface } from '../../domain/interfaces/ReadClinics.interface'
import { ReadLogoKeyInterface, ReadLogoKeyResultInterface } from '../../domain/interfaces/ReadLogoKey.interface'
import { ReadStaffStatisticsInterface, ReadStaffStatisticsResultInterface } from '../../domain/interfaces/ReadStaffStatistics.interface'
import { UpdateClinicInterface } from '../../domain/interfaces/UpdateClinic.interface'
import { UpdateLogoInterface } from '../../domain/interfaces/UpdateLogo.interface'

import checkPlanTransactions from './transactions/checkPlan.transactions'
import createClinicTransactions from './transactions/createClinic.transactions'
import readClinicQuery from './querys/readClinic.query'
import readClinicsByAdminQuery from './querys/readClinicsByAdmin.query'
import readNextAppointmentQuery from './querys/readNextAppointment.query'
import readClinicsByCollaboratorQuery from './querys/readClinicsByCollaborator.query'
import readLogoKeyQuery from './querys/readLogoKey.query'
import readStaffStatisticsQuery from './querys/readStaffStatistics.query'
import updateClinicQuery from './querys/updateClinic.query'
import updateLogoQuery from './querys/updateLogo.query'


export default class ClinicModel implements ClinicRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const values1 = [data.idAccount]
            const [selectAppPlan, selectCountClinics] = checkPlanTransactions
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values1)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const values2 = [selectAppPlanResult.rows[0].as_id_sm_admin]
            const selectCountClinicsResult: QueryResult = await this.db().query(selectCountClinics, values2)
            const availableClinics = Number(selectAppPlanResult.rows[0].clinics)
            const clinicsCreated = Number(selectCountClinicsResult.rows[0].total_clinics)
            if(availableClinics === -1) {
                return true
            }
            if(clinicsCreated >= availableClinics) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.checkPlan')
            throw error
        }
    }
    async createClinic(data: CreateClinicInterface): Promise<CreateClinicResultInterface> {
        let client: PoolClient = await this.db().connect()
        try {
            const [insertSmClinic, insertSmAdminNotification] = createClinicTransactions
            await client.query('BEGIN')
            const values1 = [
                data.clinicName,
                data.email,
                data.phonePrefix,
                data.phone,
                data.fullAddress,
                data.logo,
                data.idAppCountry,
                data.idAppTimeZone,
                data.idAppCurrency,
                data.idAccount
            ]
            const insertSmClinicResult: QueryResult = await client.query(insertSmClinic, values1)
            if(!this.checkInsert(insertSmClinicResult)) {
                await client.query('ROLLBACK')
                const modelResult: CreateClinicResultInterface = { success: false }
                return modelResult
            }

            const values2 = [
                'CLINIC',
                `The ${data.clinicName} clinic has been created`,
                data.idAccount
            ]
            const insertSmAdminNotificationResult: QueryResult = await client.query(insertSmAdminNotification, values2)
            if(!this.checkInsert(insertSmAdminNotificationResult)) {
                await client.query('ROLLBACK')
                const modelResult: CreateClinicResultInterface = { success: false }
                return modelResult
            }
            await client.query('COMMIT')
            const modelResult: CreateClinicResultInterface = {
                success: true,
                id: insertSmClinicResult.rows[0].id
            }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: ClinicModel.createClinic')
            throw error
        }
        finally {
            client.release()
        }
    }
    async readClinic(data: ReadClinicInterface): Promise<ReadClinicResultInterface> {
        try {
            const values = [data.id]
            const readClinicQueryResult: QueryResult = await this.db().query(readClinicQuery, values)
            if(this.checkSelect(readClinicQueryResult)) {
                const clinic = readClinicQueryResult.rows[0]
                const modelResult: ReadClinicResultInterface = {
                    success: true,
                    id: clinic.id,
                    clinicName: clinic.clinic_name,
                    email: clinic.email,
                    phonePrefix: clinic.phone_prefix,
                    phone: clinic.phone,
                    fullAddress: clinic.full_address,
                    logo: clinic.logo,
                    idAppCountry: clinic.id_app_country,
                    idAppTimeZone: clinic.id_app_time_zone,
                    idAppCurrency: clinic.id_app_currency
                }
                return modelResult
            }
            const modelResult: ReadClinicResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.readClinic')
            throw error
        }
    }
    async readClinicsByAdmin(data: ReadClinicsInterface): Promise<ReadClinicsResultInterface[]> {
        try {
            const values1 = [data.idAccount]
            const readClinicsByAdminQueryResult: QueryResult = await this.db().query(readClinicsByAdminQuery, values1)
            const clinicsWithAppointment = readClinicsByAdminQueryResult.rows.map(async element => {
                const values2 = [element.id]
                const readNextAppointmentQueryResult: QueryResult = await this.db().query(readNextAppointmentQuery, values2)
                let appointment = null
                if(this.checkSelect(readNextAppointmentQueryResult)) {
                    const appointmentRow = readNextAppointmentQueryResult.rows[0]
                    appointment = {
                        id: appointmentRow.id,
                        appointmentDate: appointmentRow.as_appointment_date,
                        startTime: appointmentRow.as_start_time,
                        endingTime: appointmentRow.as_ending_time,
                        annotations: appointmentRow.annotations,
                        status: appointmentRow.status,
                        chair: appointmentRow.chair_name,
                        doctor: appointmentRow.as_doctor,
                        treatment: appointmentRow.treatment_name,
                        price: appointmentRow.price,
                        email: appointmentRow.email,
                        phonePrefix: appointmentRow.phone_prefix,
                        phone: appointmentRow.phone,
                        photo: appointmentRow.photo,
                        patient: appointmentRow.as_patient,
                        idSmDentalChair: appointmentRow.id_sm_dental_chair,
                        idSmCollaborator: appointmentRow.id_sm_collaborator,
                        idSmDentalTreatment: appointmentRow.id_sm_dental_treatment,
                        idSmPatient: appointmentRow.id_sm_patient
                    }
                }
                const newElement: ReadClinicsResultInterface = {
                    id: element.id,
                    clinicName: element.clinic_name,
                    email: element.email,
                    logo: element.logo,
                    appointment
                }
                return newElement
            })
            const clinics = await Promise.all(clinicsWithAppointment)
            return clinics
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.readClinicsByAdmin')
            throw error
        }
    }
    async readClinicsByCollaborator(data: ReadClinicsInterface): Promise<ReadClinicsResultInterface[]> {
        try {
            const values1 = [data.idAccount]
            const readClinicsByCollaboratorQueryResult: QueryResult = await this.db().query(readClinicsByCollaboratorQuery, values1)
            const clinicsWithAppointment = readClinicsByCollaboratorQueryResult.rows.map(async element => {
                const values2 = [element.id]
                const readNextAppointmentQueryResult: QueryResult = await this.db().query(readNextAppointmentQuery, values2)
                let appointment = null
                if(this.checkSelect(readNextAppointmentQueryResult)) {
                    const appointmentRow = readNextAppointmentQueryResult.rows[0]
                    appointment = {
                        id: appointmentRow.id,
                        appointmentDate: appointmentRow.as_appointment_date,
                        startTime: appointmentRow.as_start_time,
                        endingTime: appointmentRow.as_ending_time,
                        annotations: appointmentRow.annotations,
                        status: appointmentRow.status,
                        chair: appointmentRow.chair_name,
                        doctor: appointmentRow.as_doctor,
                        treatment: appointmentRow.treatment_name,
                        price: appointmentRow.price,
                        email: appointmentRow.email,
                        phonePrefix: appointmentRow.phone_prefix,
                        phone: appointmentRow.phone,
                        photo: appointmentRow.photo,
                        patient: appointmentRow.as_patient,
                        idSmDentalChair: appointmentRow.id_sm_dental_chair,
                        idSmCollaborator: appointmentRow.id_sm_collaborator,
                        idSmDentalTreatment: appointmentRow.id_sm_dental_treatment,
                        idSmPatient: appointmentRow.id_sm_patient
                    }
                }
                const newElement: ReadClinicsResultInterface = {
                    id: element.id,
                    clinicName: element.clinic_name,
                    email: element.email,
                    logo: element.logo,
                    appointment
                }
                return newElement
            })
            const clinics = await Promise.all(clinicsWithAppointment)
            return clinics
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.readClinicsByCollaborator')
            throw error
        }
    }
    async readLogoKey(data: ReadLogoKeyInterface): Promise<ReadLogoKeyResultInterface> {
        try {
            const values = [data.id]
            const readLogoKeyQueryResult: QueryResult = await this.db().query(readLogoKeyQuery, values)
            if(this.checkSelect(readLogoKeyQueryResult)) {
                const clinic = readLogoKeyQueryResult.rows[0]
                const modelResult: ReadLogoKeyResultInterface = {
                    success: true,
                    logo: clinic.logo
                }
                return modelResult
            }
            const modelResult: ReadLogoKeyResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.readLogoKey')
            throw error
        }
    }
    async readStaffStatistics(data: ReadStaffStatisticsInterface): Promise<ReadStaffStatisticsResultInterface> {
        try {
            const values = [data.id]
            const readStaffStatisticsQueryResult: QueryResult = await this.db().query(readStaffStatisticsQuery, values)
            if(this.checkSelect(readStaffStatisticsQueryResult)) {
                const statistics = readStaffStatisticsQueryResult.rows[0]
                const modelResult: ReadStaffStatisticsResultInterface = {
                    success: true,
                    patients: Number(statistics.total_patients),
                    doctors: Number(statistics.total_doctors),
                    collaborators: Number(statistics.total_collaborators)
                }
                return modelResult
            }
            const modelResult: ReadStaffStatisticsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.readStaffStatistics')
            throw error
        }
    }
    async updateClinic(data: UpdateClinicInterface): Promise<boolean> {
        try {
            const values = [
                data.clinicName,
                data.email,
                data.phonePrefix,
                data.phone,
                data.fullAddress,
                data.idAppCountry,
                data.idAppCurrency,
                data.idAppTimeZone,
                data.id
            ]
            const updateClinicQueryResult: QueryResult = await this.db().query(updateClinicQuery, values)
            return this.checkInsert(updateClinicQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.updateClinic')
            throw error
        }
    }
    async updateLogo(data: UpdateLogoInterface): Promise<boolean> {
        try {
            const values = [
                data.logo,
                data.id
            ]
            const updateLogoQueryResult: QueryResult = await this.db().query(updateLogoQuery, values)
            return this.checkInsert(updateLogoQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ClinicModel.updateLogo')
            throw error
        }
    }
}