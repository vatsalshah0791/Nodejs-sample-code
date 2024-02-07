'use strict'


import ProviderRepository from '../domain/Provider.repository'

import { ReadProvidersInterface, ReadProvidersResultInterface } from '../domain/interfaces/ReadProviders.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadProvidersResultInterface[]
}


export default class ReadProvidersApplication {
    constructor(private readonly providerRepository: ProviderRepository) {}
    async run(data: ReadProvidersInterface): Promise<Result> {
        const readProvidersResult = await this.providerRepository.readProviders(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readProvidersResult
        }
        return response
    }
}