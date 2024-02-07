'use strict'


import IncomeTreatmentRepository from '../domain/IncomeTreatment'

import { ReadDayIncomesByTreatmentInterface, ReadDayIncomesByTreatmentResultInterface } from '../domain/interfaces/ReadDayIncomesByTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadDayIncomesByTreatmentResultInterface[]
}


export default class ReadDayIncomesByTreatmentApplication {
    constructor(private readonly incomeTreatmentRepository: IncomeTreatmentRepository) {}
    async run(data: ReadDayIncomesByTreatmentInterface): Promise<Result> {
        const readDayIncomesByTreatmentResult = await this.incomeTreatmentRepository.readDayIncomesByTreatment(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readDayIncomesByTreatmentResult
        }
        return response
    }
}