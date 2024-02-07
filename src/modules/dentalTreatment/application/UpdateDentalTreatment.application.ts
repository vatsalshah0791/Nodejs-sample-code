'use strict'


import DentalTreatmentRepository from '../domain/DentalTreatment.repository'

import { UpdateDentalTreatmentInterface } from '../domain/interfaces/UpdateDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateDentalTreatmentAppliation {
    constructor(private readonly dentalTreatmentRepository: DentalTreatmentRepository) {}
    async run(data: UpdateDentalTreatmentInterface): Promise<Result> {
        const updateDentalTreatmentResult = await this.dentalTreatmentRepository.updateDentalTreatment(data)
        if(!updateDentalTreatmentResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Dental treatment does not exist'
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