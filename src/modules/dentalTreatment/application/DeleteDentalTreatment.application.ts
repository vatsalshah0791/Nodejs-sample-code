'use strict'


import DentalTreatmentRepository from '../domain/DentalTreatment.repository'

import { DeleteDentalTreatmentInterface } from '../domain/interfaces/DeleteDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteDentalTreatmentApplication {
    constructor(private readonly dentalTreatmentRepository: DentalTreatmentRepository) {}
    async run(data: DeleteDentalTreatmentInterface): Promise<Result> {
        const deleteDentalTreatmentResult = await this.dentalTreatmentRepository.deleteDentalTreatment(data)
        if(!deleteDentalTreatmentResult) {
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