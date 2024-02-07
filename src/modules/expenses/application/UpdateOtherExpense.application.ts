'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { UpdateOtherExpenseInterface } from '../domain/interfaces/UpdateOtherExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateOtherExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: UpdateOtherExpenseInterface): Promise<Result> {
        const updateOtherExpenseResult = await this.expenseFixedCostsRepository.updateOtherExpense(data)
        if(!updateOtherExpenseResult) {
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