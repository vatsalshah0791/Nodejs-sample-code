'use strict'


import CurrencyRespository from '../domain/Currency.repository'

import { ReadCurrenciesResultInterface } from '../domain/interfaces/ReadCurrencies.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadCurrenciesResultInterface[]
}


export default class ReadCurrenciesApplication {
    constructor(private readonly currencyRespository: CurrencyRespository) {}
    async run(): Promise<Result> {
        const readCurrenciesResult = await this.currencyRespository.readCurrencies()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readCurrenciesResult
        }
        return response
    }
}