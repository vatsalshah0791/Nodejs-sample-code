'use strict'


import PlanRepository from '../domain/Plan.repository'

import { ReadCustomerInterface } from '../domain/interfaces/ReadCustomer.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        customerId?: string
        email?: string
    }
}


export default class ReadCustomerApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: ReadCustomerInterface): Promise<Result> {
        const readCustomerResult = await this.planRepository.readCustomer(data)
        if(!readCustomerResult.success) {
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
            message: 'Success.',
            data: {
                customerId: readCustomerResult.customerId,
                email: readCustomerResult.email
            }
        }
        return response
    }
}