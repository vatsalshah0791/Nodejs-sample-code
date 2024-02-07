'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadCommissionsByMonthInterface, ReadCommissionsByMonthResultInterface } from '../domain/interfaces/ReadCommissionsByMonth.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadCommissionsByMonthResultInterface[]
}


export default class ReadCommissionsByMonthApplication {
    constructor(
        private readonly variableExpendsRepository: VariableExpendsRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadCommissionsByMonthInterface): Promise<Result> {
        const readCommissionsByMonthResult = await this.variableExpendsRepository.readCommissionsByMonth(data)
        const mapReadCommissionsResult = readCommissionsByMonthResult.map(async commission => {
            try {
                commission.photo = await this.getObjectBase64(commission.photo)
                return commission
            } catch (error) {
                console.error(error)
                commission.photo = null
                return commission
            }
        })
        const commissions = await Promise.all(mapReadCommissionsResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: commissions
        }
        return response
    }
}