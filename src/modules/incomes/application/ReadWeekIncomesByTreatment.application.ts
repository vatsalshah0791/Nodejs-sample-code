'use strict'


import IncomeTreatmentRepository from '../domain/IncomeTreatment'

import { ReadWeekIncomesByTreatmentInterface, ReadWeekIncomesByTreatmentResultInterface } from '../domain/interfaces/ReadWeekIncomesByTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadWeekIncomesByTreatmentResultInterface[]
}


export default class ReadWeekIncomesByTreatmentApplication {
    constructor(private readonly incomeTreatmentRepository: IncomeTreatmentRepository) {}
    async run(data: ReadWeekIncomesByTreatmentInterface): Promise<Result> {
        const readWeekIncomesByTreatmentResult = await this.incomeTreatmentRepository.readWeekIncomesByTreatment(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readWeekIncomesByTreatmentResult
        }
        return response
    }
}