'use strict'


import PatientDentalTreatmentRepository from '../domain/PatientDentalTreatment.repository'

import { CreatePatientDentalTreatmentInterface } from '../domain/interfaces/CreatePatientDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class CreatePatientDentalTreatmentApplication {
    constructor(private readonly patientDentalTreatmentRepository: PatientDentalTreatmentRepository) {}
    async run(data: CreatePatientDentalTreatmentInterface): Promise<Result> {
        const createTreatmentResult = await this.patientDentalTreatmentRepository.createPatientDentalTreatment(data)
        if(!createTreatmentResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error assigning treatment'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success'
        }
        return response
    }
}