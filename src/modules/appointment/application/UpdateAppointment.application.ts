'use strict'

import AppointmentRepository from '../domain/Appointment.repository'

import { UpdateAppointmentInterface } from '../domain/Appointment.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
}

export default class UpdateAppointmentApplication {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}
    async run(data: UpdateAppointmentInterface): Promise<DTO> {
        try {
            const updateAppointmentResult = await this.appointmentRepository.updateAppointment(data)
            if(!updateAppointmentResult) {
                const response: DTO = {
                    success: true,
                    statusCode: 400,
                    message: 'The appointment does not exist',
                    language: { refresh: false }
                }
                return response
            }
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: appointments => application => UpdateAppointmentApplication.run')
            throw error
        }
    }
}