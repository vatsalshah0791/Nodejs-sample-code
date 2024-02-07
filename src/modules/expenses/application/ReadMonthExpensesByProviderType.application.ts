'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadMonthExpensesByProviderTypeInterface, ReadMonthExpensesByProviderTypeResultInterface } from '../domain/interfaces/ReadMonthExpensesByProviderType.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadMonthExpensesByProviderTypeResultInterface[]
}


export default class ReadMonthExpensesByProviderTypeApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadMonthExpensesByProviderTypeInterface): Promise<Result> {
        const readMonthExpensesByProviderTypeResult = await this.variableExpendsRepository.readMonthExpensesByProviderType(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readMonthExpensesByProviderTypeResult
        }
        return response
    }
}