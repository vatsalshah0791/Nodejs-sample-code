'use strict'


import DentalTreatmentRepository from '../domain/DentalTreatment.repository'

import { CreateDentalTreatmentInterface } from '../domain/interfaces/CreateDentalTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateDentalTreatmentApplication {
    constructor(private readonly dentalTreatmentRepository: DentalTreatmentRepository) {}
    async run(data: CreateDentalTreatmentInterface): Promise<Result> {
        const checkPlanResult = await this.dentalTreatmentRepository.checkPlan({ idClinic: data.idSmClinic })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Dental treatment limit reached'
            }
            return response
        }
        const createDentalTreatmentResult = await this.dentalTreatmentRepository.createDentalTreatment(data)
        if(!createDentalTreatmentResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating dental treatment'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createDentalTreatmentResult.id }
        }
        return response
    }
}