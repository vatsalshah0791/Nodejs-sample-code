'use strict'


import IncomeTreatmentRepository from '../domain/IncomeTreatment'

import { ReadMonthIncomesByTreatmentInterface, ReadMonthIncomesByTreatmentResultInterface } from '../domain/interfaces/ReadMonthIncomesByTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadMonthIncomesByTreatmentResultInterface[]
}


export default class ReadMonthIncomesByTreatmentApplication {
    constructor(private readonly incomeTreatmentRepository: IncomeTreatmentRepository) {}
    async run(data: ReadMonthIncomesByTreatmentInterface): Promise<Result> {
        const readWeekIncomesByTreatmentResult = await this.incomeTreatmentRepository.readMonthIncomesByTreatment(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readWeekIncomesByTreatmentResult
        }
        return response
    }
}