'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadWeekExpensesByProviderTypeInterface, ReadWeekExpensesByProviderTypeResultInterface } from '../domain/interfaces/ReadWeekExpensesByProviderType.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadWeekExpensesByProviderTypeResultInterface[]
}


export default class ReadWeekExpensesByProviderTypeApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadWeekExpensesByProviderTypeInterface): Promise<Result> {
        const readWeekExpensesByProviderTypeResult = await this.variableExpendsRepository.readWeekExpensesByProviderType(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readWeekExpensesByProviderTypeResult
        }
        return response
    }
}