'use strict'


import PlanRepository from '../domain/Plan.repository'

import { UpdateSubscriptionInterface } from '../domain/interfaces/UpdateSubscription.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateSubscriptionApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: UpdateSubscriptionInterface): Promise<Result> {
        const updateSubscriptionResult = await this.planRepository.updateSubscription(data)
        if(!updateSubscriptionResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Error editing subscription.'
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