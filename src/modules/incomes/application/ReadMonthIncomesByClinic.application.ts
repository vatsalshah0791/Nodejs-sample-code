'use strict'


import IncomeClinicRepository from '../domain/IncomeClinic.repository'

import { ReadMonthIncomesByClinicInterface, ReadMonthIncomesByClinicResultInterface } from '../domain/interfaces/ReadMonthIncomesByClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadMonthIncomesByClinicResultInterface[]
}


export default class ReadMonthIncomesByClinicApplication {
    constructor(private readonly incomeClinicRepository: IncomeClinicRepository) {}
    async run(data: ReadMonthIncomesByClinicInterface): Promise<Result> {
        const readMonthIncomesByClinicResult = await this.incomeClinicRepository.readMonthIncomesByClinic(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readMonthIncomesByClinicResult
        }
        return response
    }
}