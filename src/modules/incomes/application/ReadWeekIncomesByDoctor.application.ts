'use strict'


import IncomeDoctorRepository from '../domain/IncomeDoctor.repository'

import { ReadWeekIncomesByDoctorInterface, ReadWeekIncomesByDoctorResultInterface } from '../domain/interfaces/ReadWeekIncomesByDoctor.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadWeekIncomesByDoctorResultInterface[]
}


export default class ReadWeekIncomesByDoctorApplication {
    constructor(
        private readonly incomeDoctorRepository: IncomeDoctorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadWeekIncomesByDoctorInterface): Promise<Result> {
        const readWeekIncomesByDoctorResult = await this.incomeDoctorRepository.readWeekIncomesByDoctor(data)
        const mapReadWeekIncomesResult = readWeekIncomesByDoctorResult.map(async income => {
            try {
                income.photo = await this.getObjectBase64(income.photo)
                return income
            } catch (error) {
                console.error(error)
                income.photo = null
                return income
            }
        })
        const incomes = await Promise.all(mapReadWeekIncomesResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: incomes
        }
        return response
    }
}