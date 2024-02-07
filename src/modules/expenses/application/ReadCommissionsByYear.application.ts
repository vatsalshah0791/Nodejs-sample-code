'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadCommissionsByYearInterface, ReadCommissionsByYearResultInterface } from '../domain/interfaces/ReadCommissionsByYear.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadCommissionsByYearResultInterface[]
}


export default class ReadCommissionsByYearApplication {
    constructor(
        private readonly variableExpendsRepository: VariableExpendsRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadCommissionsByYearInterface): Promise<Result> {
        const readCommissionsByYearResult = await this.variableExpendsRepository.readCommissionsByYear(data)
        const mapReadCommissionsResult = readCommissionsByYearResult.map(async commission => {
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