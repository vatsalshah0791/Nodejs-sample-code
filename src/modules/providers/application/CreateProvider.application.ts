'use strict'


import ProviderRepository from '../domain/Provider.repository'

import { CreateProviderInterface } from '../domain/interfaces/CreateProvider.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateProviderApplication {
    constructor(private readonly providerRepository: ProviderRepository) {}
    async run(data: CreateProviderInterface): Promise<Result> {
        const checkPlanResult = await this.providerRepository.checkPlan({ idClinic: data.idSmClinic })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Vendor limit reached'
            }
            return response
        }
        const createProviderResult = await this.providerRepository.createProvider(data)
        if(!createProviderResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Failed to create provider'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createProviderResult.id }
        }
        return response
    }
}