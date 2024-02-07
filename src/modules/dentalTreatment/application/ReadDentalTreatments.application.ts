'use strict'


import DentalTreatmentRepository from '../domain/DentalTreatment.repository'

import { ReadDentalTreatmentsInterface, ReadDentalTreatmentsResultInterface } from '../domain/interfaces/ReadDentalTreatments.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadDentalTreatmentsResultInterface[]
}


export default class ReadDentalTreatmentsApplication {
    constructor(private readonly dentalTreatmentRepository: DentalTreatmentRepository) {}
    async run(data: ReadDentalTreatmentsInterface): Promise<Result> {
        const readDentalTreatmentsResult = await this.dentalTreatmentRepository.readDentalTreatments(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readDentalTreatmentsResult
        }
        return response
    }
}