'use strict'


import PlanRepository from '../domain/Plan.repository'

import { ReadSubscriptionInterface } from '../domain/interfaces/ReadSubscription.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        customerId?: string
        subscriptionId?: string
        idAppPlan?: string
        clinics?: number
        dentalChairs?: number[]
        doctors?: number
        collaborators?: number
        patients?: number
    }
}


export default class ReadSubscriptionApplication {
    constructor(private readonly planRepository: PlanRepository) {}
    async run(data: ReadSubscriptionInterface): Promise<Result> {
        const readSubscriptionResult = await this.planRepository.readSubscription(data)
        if(!readSubscriptionResult.success) {
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
                customerId: readSubscriptionResult.customerId,
                subscriptionId: readSubscriptionResult.subscriptionId,
                idAppPlan: readSubscriptionResult.idAppPlan,
                clinics: readSubscriptionResult.clinics,
                dentalChairs: readSubscriptionResult.dentalChairs,
                doctors: readSubscriptionResult.doctors,
                collaborators: readSubscriptionResult.collaborators,
                patients: readSubscriptionResult.patients
            }
        }
        return response
    }
}