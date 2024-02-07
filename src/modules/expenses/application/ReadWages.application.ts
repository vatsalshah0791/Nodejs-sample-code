'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { ReadWagesInterface, ReadWagesResultInterface } from '../domain/interfaces/ReadWages.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadWagesResultInterface[]
}


export default class ReadWagesApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: ReadWagesInterface): Promise<Result> {
        const readWagesResult = await this.expenseFixedCostsRepository.readWages(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readWagesResult
        }
        return response
    }
}