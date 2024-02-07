'use strict'


import PatientDentalTreatmentRepository from '../domain/PatientDentalTreatment.repository'

import { ToggleStatusPatientDentalTreatmentInterface } from '../domain/interfaces/ToggleStatusPatientDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class ToggleStatusPatientTreatmentApplication {
    constructor(private readonly patientDentalTreatmentRepository: PatientDentalTreatmentRepository) {}
    async run(data: ToggleStatusPatientDentalTreatmentInterface): Promise<Result> {
        const toggleStatusTreatmentResult = await this.patientDentalTreatmentRepository.toggleStatusPatientDentalTreatment(data)
        if(!toggleStatusTreatmentResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Error editing treatment status'
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