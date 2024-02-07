'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadYearExpensesByProviderTypeInterface, ReadYearExpensesByProviderTypeResultInterface } from '../domain/interfaces/ReadYearExpensesByProviderType.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadYearExpensesByProviderTypeResultInterface[]
}


export default class ReadYearExpensesByProviderTypeApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadYearExpensesByProviderTypeInterface): Promise<Result> {
        const readYearExpensesByProviderTypeResult = await this.variableExpendsRepository.readYearExpensesByProviderType(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readYearExpensesByProviderTypeResult
        }
        return response
    }
}