'use strict'


import PlanRepository from '../domain/Plan.repository'

import { ReadPlanInterface } from '../domain/interfaces/ReadPlan.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        planCode?: string
        clinics?: number
        dentalChairs?: number
        doctors?: number
        collaborators?: number
        patients?: number
    }
}


export default class ReadPlanApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: ReadPlanInterface): Promise<Result> {
        const readPlanResult = await this.planRepository.readPlan(data)
        if(!readPlanResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The plan does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success.',
            data: {
                planCode: readPlanResult.planCode,
                clinics: readPlanResult.clinics,
                dentalChairs: readPlanResult.dentalChairs,
                doctors: readPlanResult.doctors,
                collaborators: readPlanResult.collaborators,
                patients: readPlanResult.patients
            }
        }
        return response
    }
}