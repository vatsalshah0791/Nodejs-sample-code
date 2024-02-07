'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { ReadOtherExpensesInterface, ReadOtherExpensesResultInterface } from '../domain/interfaces/ReadOtherExpenses.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadOtherExpensesResultInterface[]
}


export default class ReadOtherExpensesApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: ReadOtherExpensesInterface): Promise<Result> {
        const readOtherExpensesResult = await this.expenseFixedCostsRepository.readOtherExpenses(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readOtherExpensesResult
        }
        return response
    }
}