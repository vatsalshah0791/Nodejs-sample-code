'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadDayExpensesByProviderTypeInterface, ReadDayExpensesByProviderTypeResultInterface } from '../domain/interfaces/ReadDayExpensesByProviderType.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadDayExpensesByProviderTypeResultInterface[]
}


export default class ReadDayExpensesByProviderTypeApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadDayExpensesByProviderTypeInterface): Promise<Result> {
        const readDayExpensesByProviderTypeResult = await this.variableExpendsRepository.readDayExpensesByProviderType(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readDayExpensesByProviderTypeResult
        }
        return response
    }
}