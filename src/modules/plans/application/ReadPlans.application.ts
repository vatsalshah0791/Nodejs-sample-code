'use strict'


import PlanRepository from '../domain/Plan.repository'

import { ReadPlansResultInterface } from '../domain/interfaces/ReadPlans.interface'


interface Reault {
    success: boolean
    statusCode: number
    message: string
    data: ReadPlansResultInterface[]
}


export default class ReadPlansApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(): Promise<Reault> {
        const readPlansResult = await this.planRepository.readPlans()
        const response: Reault = {
            success: true,
            statusCode: 200,
            message: 'Success.',
            data: readPlansResult
        }
        return response
    }
}