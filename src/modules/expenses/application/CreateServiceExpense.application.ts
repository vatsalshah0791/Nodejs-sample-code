'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { CreateServiceExpenseInterface } from '../domain/interfaces/CreateServiceExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateServiceExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: CreateServiceExpenseInterface): Promise<Result> {
        const createServiceExpenseResult = await this.expenseFixedCostsRepository.createServiceExpense(data)
        if(!createServiceExpenseResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The service expense could not be created'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createServiceExpenseResult.id }
        }
        return response
    }
}