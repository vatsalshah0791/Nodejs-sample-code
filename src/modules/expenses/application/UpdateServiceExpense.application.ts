'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { UpdateServiceExpenseInterface } from '../domain/interfaces/UpdateServiceExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateServiceExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: UpdateServiceExpenseInterface): Promise<Result> {
        const updateServiceExpenseResult = await this.expenseFixedCostsRepository.updateServiceExpense(data)
        if(!updateServiceExpenseResult) {
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