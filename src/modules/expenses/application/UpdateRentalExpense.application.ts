'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { UpdateRentalExpenseInterface } from '../domain/interfaces/UpdateRentalExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateRentalExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: UpdateRentalExpenseInterface): Promise<Result> {
        const updateRentalExpenseResult = await this.expenseFixedCostsRepository.updateRentalExpense(data)
        if(!updateRentalExpenseResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error when editing the output'
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