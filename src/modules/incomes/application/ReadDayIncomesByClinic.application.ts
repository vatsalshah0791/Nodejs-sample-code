'use strict'


import IncomeClinicRepository from '../domain/IncomeClinic.repository'

import { ReadDayIncomesByClinicInterface, ReadDayIncomesByClinicResultInterface } from '../domain/interfaces/ReadDayIncomesByClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadDayIncomesByClinicResultInterface[]
}


export default class ReadDayIncomesByClinicApplication {
    constructor(
        private readonly incomeClinicRepository: IncomeClinicRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadDayIncomesByClinicInterface): Promise<Result> {
        const readDayIncomesByClinicResult = await this.incomeClinicRepository.readDayIncomesByClinic(data)
        const mapReadDayIncomesResult = readDayIncomesByClinicResult.map(async income => {
            try {
                income.photo = await this.getObjectBase64(income.photo)
                return income
            } catch (error) {
                console.error(error)
                income.photo = null
                return income
            }
        })
        const incomes = await Promise.all(mapReadDayIncomesResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: incomes
        }
        return response
    }
}