'use strict'


import ProviderRepository from '../domain/Provider.repository'

import { UpdateProviderInterface } from '../domain/interfaces/UpdateProvider.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateProviderApplication {
    constructor(private readonly providerRepository: ProviderRepository) {}
    async run(data: UpdateProviderInterface): Promise<Result> {
        const updateProviderResult = await this.providerRepository.updateProvider(data)
        if(!updateProviderResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The provider does not exist'
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