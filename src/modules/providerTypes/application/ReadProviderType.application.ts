'use strict'


import ProviderTypeRepository from '../domain/ProviderType.repository'

import { ReadProviderTypeResultInterface } from '../domain/interface/ReadProviderTypes.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadProviderTypeResultInterface[]
}

export default class ReadProviderTypeApplication {
    constructor(private readonly providerTypeRepository: ProviderTypeRepository) {}
    async run(): Promise<Result> {
        const readProviderTypeResult = await this.providerTypeRepository.readProviderType()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readProviderTypeResult
        }
        return response
    }
}