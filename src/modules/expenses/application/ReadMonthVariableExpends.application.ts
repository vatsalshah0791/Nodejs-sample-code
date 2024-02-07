'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadMonthVariableExpendsInterface } from '../domain/interfaces/ReadMonthVariableExpends.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        currency?: string
        dentalDeposits?: number
        dentalLaboratories?: number
        anotherSuppliers?: number
        commissions?: number
    }
}


export default class ReadMonthVariableExpendsApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadMonthVariableExpendsInterface): Promise<Result> {
        const readMonthVariableExpendsResult = await this.variableExpendsRepository.readMonthVariableExpends(data)
        if(!readMonthVariableExpendsResult.success) {
            const response: Result = {
                success: true,
                statusCode: 200,
                message: 'The clinic does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                currency: readMonthVariableExpendsResult.currency,
                dentalDeposits: readMonthVariableExpendsResult.dentalDeposits,
                dentalLaboratories: readMonthVariableExpendsResult.dentalLaboratories,
                anotherSuppliers: readMonthVariableExpendsResult.anotherSuppliers,
                commissions: readMonthVariableExpendsResult.commissions
            }
        }
        return response
    }
}