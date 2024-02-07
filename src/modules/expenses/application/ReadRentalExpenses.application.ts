'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { ReadRentalExpensesInterface, ReadRentalExpensesResultInterface } from '../domain/interfaces/ReadRentalExpenses.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadRentalExpensesResultInterface[]
}


export default class ReadRentalExpensesApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: ReadRentalExpensesInterface): Promise<Result> {
        const readRentalExpensesResult = await this.expenseFixedCostsRepository.readRentalExpenses(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readRentalExpensesResult
        }
        return response
    }
}