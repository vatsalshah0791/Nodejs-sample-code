'use strict'


import IncomeTreatmentRepository from '../domain/IncomeTreatment'

import { ReadYearIncomesByTreatmentInterface, ReadYearIncomesByTreatmentResultInterface } from '../domain/interfaces/ReadYearIncomesByTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadYearIncomesByTreatmentResultInterface[]
}


export default class ReadYearIncomesByTreatmentApplication {
    constructor(private readonly incomeTreatmentRepository: IncomeTreatmentRepository) {}
    async run(data: ReadYearIncomesByTreatmentInterface): Promise<Result> {
        const readYearIncomesByTreatmentResult = await this.incomeTreatmentRepository.readYearIncomesByTreatment(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readYearIncomesByTreatmentResult
        }
        return response
    }
}