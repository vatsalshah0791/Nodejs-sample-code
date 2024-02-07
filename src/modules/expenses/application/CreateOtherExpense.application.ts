'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { CreateOtherExpenseInterface } from '../domain/interfaces/CreateOtherExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateOtherExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: CreateOtherExpenseInterface): Promise<Result> {
        const createOtherExpenseResult = await this.expenseFixedCostsRepository.createOtherExpense(data)
        if(!createOtherExpenseResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Could not create egress'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createOtherExpenseResult.id }
        }
        return response
    }
}