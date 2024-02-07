'use strict'

import AppointmentRepository from '../domain/Appointment.repository'

import {
    ReadAppointmentsByPatientInterface,
    ReadAppointmentsResultInterface
} from '../domain/Appointment.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: ReadAppointmentsResultInterface[]
}

export default class ReadAppointmentsByPatientApplication {
    constructor(
        private readonly appointmentRepository: AppointmentRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadAppointmentsByPatientInterface): Promise<DTO> {
        try {
            const readAppointmentsByPatientResult = await this.appointmentRepository.readAppointmentsByPatient(data)
            const mapReadAppointmentsByPatient = readAppointmentsByPatientResult.map(async appointment => {
                try {
                    appointment.photo = await this.getObjectBase64(appointment.photo)
                    return appointment
                } catch (error) {
                    console.error(error)
                    appointment.photo = null
                    return appointment
                }
            })
            const appointments = await Promise.all(mapReadAppointmentsByPatient)
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: appointments
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: appointments => application => ReadAppointmentsByPatientApplication.run')
            throw error
        }
    }
}