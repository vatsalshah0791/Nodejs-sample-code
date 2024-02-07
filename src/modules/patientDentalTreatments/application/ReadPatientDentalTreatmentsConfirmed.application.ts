'use strict'


import PatientDentalTreatmentRepository from '../domain/PatientDentalTreatment.repository'

import { ReadPatientDentalTreatmentsConfirmedInterface, ReadPatientDentalTreatmentsConfirmedResultInterface } from '../domain/interfaces/ReadPatientDentalTreatmentsConfirmed.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPatientDentalTreatmentsConfirmedResultInterface[]
}


export default class ReadPatientDentalTreatmentsConfirmedApplication {
    constructor(private readonly patientDentalTreatmentRepository: PatientDentalTreatmentRepository) {}
    async run(data: ReadPatientDentalTreatmentsConfirmedInterface): Promise<Result> {
        const readTreatmentsConfirmedResult = await this.patientDentalTreatmentRepository.readPatientDentalTreatmentsConfirmed(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readTreatmentsConfirmedResult
        }
        return response
    }
}