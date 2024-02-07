'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { ReadServiceExpensesInterface, ReadServiceExpensesResultInterface } from '../domain/interfaces/ReadServiceExpenses.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadServiceExpensesResultInterface[]
}


export default class ReadServiceExpensesApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: ReadServiceExpensesInterface): Promise<Result> {
        const readServiceExpensesResult = await this.expenseFixedCostsRepository.readServiceExpenses(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readServiceExpensesResult
        }
        return response
    }
}