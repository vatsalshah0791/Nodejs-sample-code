'use strict'

import AppointmentRepository from '../domain/Appointment.repository'

import { UpdateStatusInterface } from '../domain/Appointment.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
}

export default class UpdateStatusApplication {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}
    async run(data: UpdateStatusInterface): Promise<DTO> {
        try {
            const updateStatusResult = await this.appointmentRepository.updateStatus(data)
            if(!updateStatusResult) {
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
            console.error('ERROR -- LOGIC: appointments => application => UpdateStatusApplication.run')
            throw error
        }
    }
}