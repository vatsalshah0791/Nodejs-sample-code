'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { DeleteOtherExpenseInterface } from '../domain/interfaces/DeleteOtherExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteOtherExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: DeleteOtherExpenseInterface): Promise<Result> {
        const deleteOtherExpenseResult = await this.expenseFixedCostsRepository.deleteOtherExpense(data)
        if(!deleteOtherExpenseResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error deleting output'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}