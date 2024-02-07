'use strict'

import { QueryResult, Pool } from 'pg'

import AppointmentRepository from '../../domain/Appointment.repository'

import {
    CreateAppointmentInterface,
    CreateAppointmentResultInterface,
    ReadAppointmentInterface,
    ReadAppointmentResultInterface,
    UpdateAppointmentInterface,
    UpdateStatusInterface,
    ReadAppointmentsByPatientInterface,
    ReadAppointmentsByClinicInterface,
    ReadAppointmentsResultInterface
} from '../../domain/Appointment.interface'

export default class AppointmentModel implements AppointmentRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkDataAffected: (param: QueryResult) => boolean,
    ) {}
    async createAppointment(data: CreateAppointmentInterface): Promise<CreateAppointmentResultInterface> {
        try {
            const insertSmAppointment: QueryResult = await this.db().query(`
                INSERT INTO sm_appointment (
                    appointment_date,
                    start_time,
                    ending_time,
                    annotations,
                    id_sm_dental_chair,
                    id_sm_collaborator,
                    id_sm_dental_treatment,
                    id_sm_patient,
                    id_sm_clinic
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id
            `, [
                data.appointmentDate,
                data.startTime,
                data.endingTime,
                data.annotations,
                data.idDentalChair,
                data.idCollaborator,
                data.idDentalTreatment,
                data.idPatient,
                data.idClinic
            ])
            const modelResult: CreateAppointmentResultInterface = {
                success: true,
                id: insertSmAppointment.rows[0].id
            }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AppointmentModel.createAppointment')
            throw error
        }
    }
    async readAppointment(data: ReadAppointmentInterface): Promise<ReadAppointmentResultInterface> {
        try {
            const selectSmAppointment: QueryResult = await this.db().query(`
                SELECT
                	sm_appointment.id,
                	TO_CHAR(sm_appointment.appointment_date, 'YYYY-MM-DD') as as_appointment_date,
                    TO_CHAR(sm_appointment.start_time, 'HH24:MI') as as_start_time,
					TO_CHAR(sm_appointment.ending_time, 'HH24:MI') as as_ending_time,
                	sm_appointment.annotations,
                	sm_appointment.status,
                	sm_dental_chair.chair_name,
                	sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
                	sm_dental_treatment.treatment_name,
                	sm_dental_treatment.price,
                	sm_patient.email,
                	sm_patient.phone,
                    patient.photo,
                	patient.first_name || ' ' || patient.last_name as as_patient,
                	sm_appointment.id_sm_dental_chair,
                	sm_appointment.id_sm_collaborator,
                    sm_appointment.id_sm_patient,
                	sm_appointment.id_sm_dental_treatment
                FROM sm_appointment
                INNER JOIN sm_dental_chair ON sm_dental_chair.id=sm_appointment.id_sm_dental_chair
                INNER JOIN sm_collaborator ON sm_collaborator.id=sm_appointment.id_sm_collaborator
                INNER JOIN sm_account ON sm_account.id=sm_collaborator.id_sm_account
                INNER JOIN sm_dental_treatment ON sm_dental_treatment.id=sm_appointment.id_sm_dental_treatment
                INNER JOIN sm_patient ON sm_patient.id=sm_appointment.id_sm_patient
                INNER JOIN sm_account patient ON patient.id=sm_patient.id_sm_account
                WHERE sm_appointment.id=$1
                AND sm_appointment.deleted_at IS NULL
            `, [data.id])
            if(selectSmAppointment.rows.length > 0) {
                const appointment = selectSmAppointment.rows[0]
                const modelResult: ReadAppointmentResultInterface = {
                    success: true,
                    id: appointment.id,
                    appointmentDate: appointment.as_appointment_date,
                    startTime: appointment.as_start_time,
                    endingTime: appointment.as_ending_time,
                    annotations: appointment.annotations,
                    status: appointment.status,
                    chair: appointment.chair_name,
                    doctor: appointment.as_doctor,
                    treatment: appointment.treatment_name,
                    price: appointment.price,
                    email: appointment.email,
                    phone: appointment.phone,
                    patient: appointment.as_patient,
                    photo: appointment.photo,
                    idDentalChair: appointment.id_sm_dental_chair,
                    idDoctor: appointment.id_sm_collaborator,
                    idPatient: appointment.id_sm_patient,
                    idDentalTreatment: appointment.id_sm_dental_treatment
                }
                return modelResult
            }
            const modelResult: ReadAppointmentResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AppointmentModel.readAppointment')
            throw error
        }
    }
    async updateAppointment(data: UpdateAppointmentInterface): Promise<boolean> {
        try {
            const updateSmAppointment: QueryResult = await this.db().query(`
                UPDATE sm_appointment
                SET
                    appointment_date=$1,
                    start_time=$2,
                    ending_time=$3,
                    annotations=$4,
                    id_sm_dental_chair=$5,
                    id_sm_collaborator=$6,
                    id_sm_dental_treatment=$7
                WHERE id=$8
                AND deleted_at IS NULL
            `, [
                data.appointmentDate,
                data.startTime,
                data.endingTime,
                data.annotations,
                data.idDentalChair,
                data.idCollaborator,
                data.idDentalTreatment,
                data.id
            ])
            return this.checkDataAffected(updateSmAppointment)
        } catch (error) {
            console.error('ERROR -- MODEL: AppointmentModel.updateAppointment')
            throw error
        }
    }
    async updateStatus(data: UpdateStatusInterface): Promise<boolean> {
        try {
            const updateSmAppointment: QueryResult = await this.db().query(`
                UPDATE sm_appointment
                SET
                    status=$1
                WHERE id=$2
                AND deleted_at IS NULL
            `, [data.status, data.id])
            return this.checkDataAffected(updateSmAppointment)
        } catch (error) {
            console.error('ERROR -- MODEL: AppointmentModel.updateStatus')
            throw error
        }
    }
    async readAppointmentsByPatient(data: ReadAppointmentsByPatientInterface): Promise<ReadAppointmentsResultInterface[]> {
        try {
            const selectSmAppointment: QueryResult = await this.db().query(`
                SELECT
                    sm_appointment.id,
                    TO_CHAR(sm_appointment.appointment_date, 'YYYY-MM-DD') as as_appointment_date,
                    TO_CHAR(sm_appointment.start_time, 'HH24:MI') as as_start_time,
					TO_CHAR(sm_appointment.ending_time, 'HH24:MI') as as_ending_time,
                    sm_appointment.annotations,
                    sm_appointment.status,
                    sm_dental_chair.chair_name,
                    sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
                    sm_dental_treatment.treatment_name,
                    sm_dental_treatment.price,
                    sm_patient.email,
                    sm_patient.phone,
                    patient.photo,
                    patient.first_name || ' ' || patient.last_name as as_patient,
                    sm_appointment.id_sm_dental_chair,
                    sm_appointment.id_sm_collaborator,
                    sm_appointment.id_sm_dental_treatment
                FROM sm_appointment
                INNER JOIN sm_dental_chair ON sm_dental_chair.id=sm_appointment.id_sm_dental_chair
                INNER JOIN sm_collaborator ON sm_collaborator.id=sm_appointment.id_sm_collaborator
                INNER JOIN sm_account ON sm_account.id=sm_collaborator.id_sm_account
                INNER JOIN sm_dental_treatment ON sm_dental_treatment.id=sm_appointment.id_sm_dental_treatment
                INNER JOIN sm_patient ON sm_patient.id=sm_appointment.id_sm_patient
                INNER JOIN sm_account patient ON patient.id=sm_patient.id_sm_account
                WHERE sm_appointment.id_sm_patient=$1
                AND sm_appointment.deleted_at IS NULL
            `, [data.idPatient])
            const appointments = selectSmAppointment.rows.map(element => {
                const newElement: ReadAppointmentsResultInterface = {
                    id: element.id,
                    appointmentDate: element.as_appointment_date,
                    startTime: element.as_start_time,
                    endingTime: element.as_ending_time,
                    annotations: element.annotations,
                    status: element.status,
                    chair: element.chair_name,
                    doctor: element.as_doctor,
                    treatment: element.treatment_name,
                    price: element.price,
                    email: element.email,
                    phone: element.phone,
                    patient: element.as_patient,
                    photo: element.photo,
                    idDentalChair: element.id_sm_dental_chair,
                    idDoctor: element.id_sm_collaborator,
                    idDentalTreatment: element.id_sm_dental_treatment
                }
                return newElement
            })
            return appointments
        } catch (error) {
            console.error('ERROR -- MODEL: AppointmentModel.readAppointmentsByPatient')
            throw error
        }
    }
    async readAppointmentsByClinic(data: ReadAppointmentsByClinicInterface): Promise<ReadAppointmentsResultInterface[]> {
        try {
            const selectSmAppointment: QueryResult = await this.db().query(`
                SELECT
                    sm_appointment.id,
                    TO_CHAR(sm_appointment.appointment_date, 'YYYY-MM-DD') as as_appointment_date,
                    TO_CHAR(sm_appointment.start_time, 'HH24:MI') as as_start_time,
					TO_CHAR(sm_appointment.ending_time, 'HH24:MI') as as_ending_time,
                    sm_appointment.annotations,
                    sm_appointment.status,
                    sm_dental_chair.chair_name,
                    sm_account.first_name || ' ' || sm_account.last_name as as_doctor,
                    sm_dental_treatment.treatment_name,
                    sm_dental_treatment.price,
                    sm_patient.email,
                    sm_patient.phone,
                    patient.photo,
                    patient.first_name || ' ' || patient.last_name as as_patient,
                    sm_appointment.id_sm_dental_chair,
                    sm_appointment.id_sm_collaborator,
                    sm_appointment.id_sm_patient,
                    sm_appointment.id_sm_dental_treatment
                FROM sm_appointment
                INNER JOIN sm_dental_chair ON sm_dental_chair.id=sm_appointment.id_sm_dental_chair
                INNER JOIN sm_collaborator ON sm_collaborator.id=sm_appointment.id_sm_collaborator
                INNER JOIN sm_account ON sm_account.id=sm_collaborator.id_sm_account
                INNER JOIN sm_dental_treatment ON sm_dental_treatment.id=sm_appointment.id_sm_dental_treatment
                INNER JOIN sm_patient ON sm_patient.id=sm_appointment.id_sm_patient
                INNER JOIN sm_account patient ON patient.id=sm_patient.id_sm_account
                WHERE sm_appointment.id_sm_clinic=$1
                AND sm_appointment.status=1
                AND sm_appointment.deleted_at IS NULL
            `, [data.idClinic])
            const appointments = selectSmAppointment.rows.map(element => {
                const newElement: ReadAppointmentsResultInterface = {
                    id: element.id,
                    appointmentDate: element.as_appointment_date,
                    startTime: element.as_start_time,
                    endingTime: element.as_ending_time,
                    annotations: element.annotations,
                    status: element.status,
                    chair: element.chair_name,
                    doctor: element.as_doctor,
                    treatment: element.treatment_name,
                    price: element.price,
                    email: element.email,
                    phone: element.phone,
                    patient: element.as_patient,
                    photo: element.photo,
                    idDentalChair: element.id_sm_dental_chair,
                    idDoctor: element.id_sm_collaborator,
                    idPatient: element.id_sm_patient,
                    idDentalTreatment: element.id_sm_dental_treatment
                }
                return newElement
            })
            return appointments
        } catch (error) {
            console.error('ERROR -- MODEL: AppointmentModel.readAppointmentsByClinic')
            throw error
        }
    }
}