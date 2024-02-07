'use strict'


import PatientDentalTreatmentRepository from '../domain/PatientDentalTreatment.repository'

import { ReadPatientDentalTreatmentsDraftsInterface, ReadPatientDentalTreatmentsDraftsResultInterface } from '../domain/interfaces/ReadPatientDentalTreatmentsDrafts.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPatientDentalTreatmentsDraftsResultInterface[]
}


export default class ReadPatientTreatmentsDraftsApplication {
    constructor(private readonly patientDentalTreatmentRepository: PatientDentalTreatmentRepository) {}
    async run(data: ReadPatientDentalTreatmentsDraftsInterface): Promise<Result> {
        const readTreatmentsDraftsResult = await this.patientDentalTreatmentRepository.readPatientDentalTreatmentsDrafts(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readTreatmentsDraftsResult
        }
        return response
    }
}