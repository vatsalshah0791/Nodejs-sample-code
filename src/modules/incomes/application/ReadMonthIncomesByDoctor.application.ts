'use strict'


import IncomeDoctorRepository from '../domain/IncomeDoctor.repository'

import { ReadMonthIncomesByDoctorInterface, ReadMonthIncomesByDoctorResultInterface } from '../domain/interfaces/ReadMonthIncomesByDoctor.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadMonthIncomesByDoctorResultInterface[]
}


export default class ReadMonthIncomesByDoctorApplication {
    constructor(
        private readonly incomeDoctorRepository: IncomeDoctorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadMonthIncomesByDoctorInterface): Promise<Result> {
        const readMonthIncomesByDoctorResult = await this.incomeDoctorRepository.readMonthIncomesByDoctor(data)
        const mapReadMonthIncomesResult = readMonthIncomesByDoctorResult.map(async income => {
            try {
                income.photo = await this.getObjectBase64(income.photo)
                return income
            } catch (error) {
                console.error(error)
                income.photo = null
                return income
            }
        })
        const incomes = await Promise.all(mapReadMonthIncomesResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: incomes
        }
        return response
    }
}