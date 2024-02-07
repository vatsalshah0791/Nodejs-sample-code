'use strict'


import PatientDentalTreatmentRepository from '../domain/PatientDentalTreatment.repository'

import { CancelPatientDentalTreatmentInterface } from '../domain/interfaces/CancelPatientDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class CancelPatientDentalTreatmentApplication {
    constructor(private readonly patientDentalTreatmentRepository: PatientDentalTreatmentRepository) {}
    async run(data: CancelPatientDentalTreatmentInterface): Promise<Result> {
        const cancelTreatmentResult = await this.patientDentalTreatmentRepository.cancelPatientDentalTreatment(data)
        if(!cancelTreatmentResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Error when deleting the purchased treatment.'
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