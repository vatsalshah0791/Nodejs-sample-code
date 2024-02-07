'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { DeleteRentalExpenseInterface } from '../domain/interfaces/DeleteRentalExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteRentalExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: DeleteRentalExpenseInterface): Promise<Result> {
        const deleteRentalExpenseResult = await this.expenseFixedCostsRepository.deleteRentalExpense(data)
        if(!deleteRentalExpenseResult) {
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