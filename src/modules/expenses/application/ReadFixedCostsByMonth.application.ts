'use strict'


import ExpenseFixedCostsRepository from '../domain/ExpenseFixedCosts.repository'

import { ReadFixedCostsByMonthInterface } from '../domain/interfaces/ReadFixedCostsByMonth.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        currency?: string
        rental?: number
        wages?: number
        services?: number
        others?: number
    }
}


export default class ReadFixedCostsByMonthApplication {
    constructor(private readonly expenseFixedCostsRepository: ExpenseFixedCostsRepository) {}
    async run(data: ReadFixedCostsByMonthInterface): Promise<Result> {
        const readFixedCostsByMonthResult = await this.expenseFixedCostsRepository.readFixedCostsByMonth(data)
        if(readFixedCostsByMonthResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The clinic does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                currency: readFixedCostsByMonthResult.currency,
                rental: readFixedCostsByMonthResult.rental,
                wages: readFixedCostsByMonthResult.wages,
                services: readFixedCostsByMonthResult.services,
                others: readFixedCostsByMonthResult.others
            }
        }
        return response
    }
}