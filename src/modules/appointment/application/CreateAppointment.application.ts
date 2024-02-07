'use strict'

import AppointmentRepository from '../domain/Appointment.repository'

import { CreateAppointmentInterface } from '../domain/Appointment.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: { id?: string }
}

export default class CreateAppointmentApplication {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}
    async run(data: CreateAppointmentInterface): Promise<DTO> {
        try {
            const createAppointmentResult = await this.appointmentRepository.createAppointment(data)
            if(!createAppointmentResult.success) {
                const response: DTO = {
                    success: false,
                    statusCode: 500,
                    message: 'Error creating appointment',
                    language: { refresh: false }
                }
                return response
            }
            const response: DTO = {
                success: true,
                statusCode: 201,
                message: 'Success',
                language: { refresh: false },
                data: { id: createAppointmentResult.id }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: appointments => application => CreateAppointmentApplication.run')
            throw error
        }
    }
}