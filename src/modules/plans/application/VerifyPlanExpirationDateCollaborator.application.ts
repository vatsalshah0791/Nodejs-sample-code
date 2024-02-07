'use strict'


import PlanRepository from '../domain/Plan.repository'

import { VerifyPlanExpirationDateInterface } from '../domain/interfaces/VerifyPlanExpirationDate.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class VerifyPlanExpirationDateCollaboratorApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: VerifyPlanExpirationDateInterface): Promise<Result> {
        const verifyPlanExpirationDateCollaboratorResult = await this.planRepository.verifyPlanExpirationDateCollaborator(data)
        if(!verifyPlanExpirationDateCollaboratorResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'The plan has expired or is suspended.'
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