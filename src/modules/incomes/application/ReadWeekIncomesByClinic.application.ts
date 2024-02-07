'use strict'


import IncomeClinicRepository from '../domain/IncomeClinic.repository'

import { ReadWeekIncomesByClinicInterface, ReadWeekIncomesByClinicResultInterface } from '../domain/interfaces/ReadWeekIncomesByClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadWeekIncomesByClinicResultInterface[]
}


export default class ReadWeekIncomesByClinicApplication {
    constructor(private readonly incomeClinicRepository: IncomeClinicRepository) {}
    async run(data: ReadWeekIncomesByClinicInterface): Promise<Result> {
        const readWeekIncomesByClinicResult = await this.incomeClinicRepository.readWeekIncomesByClinic(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readWeekIncomesByClinicResult
        }
        return response
    }
}