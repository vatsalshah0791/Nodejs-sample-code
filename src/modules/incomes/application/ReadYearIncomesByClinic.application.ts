'use strict'


import IncomeClinicRepository from '../domain/IncomeClinic.repository'

import { ReadYearIncomesByClinicInterface, ReadYearIncomesByClinicResultInterface } from '../domain/interfaces/ReadYearIncomesByClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadYearIncomesByClinicResultInterface[]
}


export default class ReadYearIncomesByClinicApplication {
    constructor(private readonly incomeClinicRepository: IncomeClinicRepository) {}
    async run(data: ReadYearIncomesByClinicInterface): Promise<Result> {
        const readYearIncomesByClinicResult = await this.incomeClinicRepository.readYearIncomesByClinic(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readYearIncomesByClinicResult
        }
        return response
    }
}