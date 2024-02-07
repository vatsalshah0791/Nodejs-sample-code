'use strict'


import ProviderRepository from '../domain/Provider.repository'

import { DeleteProviderInterface } from '../domain/interfaces/DeleteProvider.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteProviderApplication {
    constructor(private readonly providerRepository: ProviderRepository) {}
    async run(data: DeleteProviderInterface): Promise<Result> {
        const deleteProviderResult = await this.providerRepository.deleteProvider(data)
        if(!deleteProviderResult) {
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