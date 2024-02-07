'use strict'


import DentalChairRepository from '../domain/DentalChair.repository'

import { CreateDentalChairInterface } from '../domain/interfaces/CreateDentalChair.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateDentalChairApplication {
    constructor(private readonly dentalChairRepository: DentalChairRepository) {}
    async run(data: CreateDentalChairInterface): Promise<Result> {
        const checkPlanResult = await this.dentalChairRepository.checkPlan({ idClinic: data.idSmClinic })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Dental chair limit reached'
            }
            return response
        }
        const createDentalChairResult = await this.dentalChairRepository.createDentalChair(data)
        if(!createDentalChairResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating dental chair'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createDentalChairResult.id }
        }
        return response
    }
}