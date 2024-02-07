'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { CreateRentalExpenseInterface } from '../domain/interfaces/CreateRentalExpense.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateRentalExpenseApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: CreateRentalExpenseInterface): Promise<Result> {
        const expenseRepositoryResult = await this.expenseFixedCostsRepository.createRentalExpense(data)
        if(!expenseRepositoryResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The rental expense could not be created'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: expenseRepositoryResult.id }
        }
        return response
    }
}