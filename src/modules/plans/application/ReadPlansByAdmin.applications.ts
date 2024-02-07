'use strict'


import PlanRepository from '../domain/Plan.repository'

import { ReadPlansResultInterface, ReadPlansByAdminInterface } from '../domain/interfaces/ReadPlans.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data: ReadPlansResultInterface[]
}


export default class ReadPlansByAdminApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: ReadPlansByAdminInterface): Promise<Result> {
        const readPlansByAdminResult = await this.planRepository.readPlansByAdmin(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success.',
            data: readPlansByAdminResult
        }
        return response
    }
}