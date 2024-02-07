'use strict'


import PlanRepository from '../domain/Plan.repository'

import { UpdateIdCustomerInterface } from '../domain/interfaces/UpdateIdCustomer.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateIdCustomerApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: UpdateIdCustomerInterface): Promise<Result> {
        const updateIdCustomerResult = await this.planRepository.updateIdCustomer(data)
        if(!updateIdCustomerResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The customer does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success.'
        }
        return response
    }
}