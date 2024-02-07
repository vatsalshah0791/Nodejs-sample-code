'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadYearVariableExpendsInterface } from '../domain/interfaces/ReadYearVariableExpends.interface'


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


export default class ReadYearVariableExpendsApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadYearVariableExpendsInterface): Promise<Result> {
        const readYearVariableExpendsResult = await this.variableExpendsRepository.readYearVariableExpends(data)
        if(!readYearVariableExpendsResult.success) {
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
                currency: readYearVariableExpendsResult.currency,
                dentalDeposits: readYearVariableExpendsResult.dentalDeposits,
                dentalLaboratories: readYearVariableExpendsResult.dentalLaboratories,
                anotherSuppliers: readYearVariableExpendsResult.anotherSuppliers,
                commissions: readYearVariableExpendsResult.commissions
            }
        }
        return response
    }
}