'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { DeleteServiceExpenseInterface } from '../domain/interfaces/DeleteServiceExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteServiceExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: DeleteServiceExpenseInterface): Promise<Result> {
        const deleteServiceExpenseResult = await this.expenseFixedCostsRepository.deleteServiceExpense(data)
        if(!deleteServiceExpenseResult) {
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