'use strict'

import AppointmentRepository from '../domain/Appointment.repository'

import {
    ReadAppointmentInterface,
    ReadAppointmentResultInterface
} from '../domain/Appointment.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: Omit<ReadAppointmentResultInterface, 'success'>
}

export default class ReadAppointmentApplication {
    constructor(
        private readonly appointmentRepository: AppointmentRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadAppointmentInterface): Promise<DTO> {
        try {
            const readAppointmentResult = await this.appointmentRepository.readAppointment(data)
            if(!readAppointmentResult.success) {
                const response: DTO = {
                    success: false,
                    statusCode: 400,
                    message: 'The appointment does not exist',
                    language: { refresh: false }
                }
                return response
            }
            const photo = await this.getObjectBase64(readAppointmentResult.photo)
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: {
                    id: readAppointmentResult.id,
                    appointmentDate: readAppointmentResult.appointmentDate,
                    startTime: readAppointmentResult.startTime,
                    endingTime: readAppointmentResult.endingTime,
                    annotations: readAppointmentResult.annotations,
                    status: readAppointmentResult.status,
                    chair: readAppointmentResult.chair,
                    doctor: readAppointmentResult.doctor,
                    treatment: readAppointmentResult.treatment,
                    price: readAppointmentResult.price,
                    email: readAppointmentResult.email,
                    phone: readAppointmentResult.phone,
                    patient: readAppointmentResult.patient,
                    photo,
                    idDentalChair: readAppointmentResult.idDentalChair,
                    idDoctor: readAppointmentResult.idDoctor,
                    idPatient: readAppointmentResult.idPatient,
                    idDentalTreatment: readAppointmentResult.idDentalTreatment
                }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: appointments => application => ReadAppointmentApplication.run')
            throw error
        }
    }
}