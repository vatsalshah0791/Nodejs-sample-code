'use strict'


import PatientDentalTreatmentRepository from '../domain/PatientDentalTreatment.repository'

import { ConfirmPatientDentalTreatmentInterface } from '../domain/interfaces/ConfirmPatientDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class ConfirmPatientDentalTreatmentApplication {
    constructor(private readonly patientDentalTreatmentRepository: PatientDentalTreatmentRepository) {}
    async run(data: ConfirmPatientDentalTreatmentInterface): Promise<Result> {
        const confirmTreatmentResult = await this.patientDentalTreatmentRepository.confirmPatientDentalTreatment(data)
        if(!confirmTreatmentResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Error confirming treatment'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}