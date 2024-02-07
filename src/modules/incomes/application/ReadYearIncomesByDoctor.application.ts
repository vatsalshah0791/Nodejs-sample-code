'use strict'


import IncomeDoctorRepository from '../domain/IncomeDoctor.repository'

import { ReadYearIncomesByDoctorInterface, ReadYearIncomesByDoctorResultInterface } from '../domain/interfaces/ReadYearIncomesByDoctor.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadYearIncomesByDoctorResultInterface[]
}


export default class ReadYearIncomesByDoctorApplication {
    constructor(
        private readonly incomeDoctorRepository: IncomeDoctorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadYearIncomesByDoctorInterface): Promise<Result> {
        const readYearIncomesByDoctorResult = await this.incomeDoctorRepository.readYearIncomesByDoctor(data)
        const mapReadYearIncomesResult = readYearIncomesByDoctorResult.map(async income => {
            try {
                income.photo = await this.getObjectBase64(income.photo)
                return income
            } catch (error) {
                console.error(error)
                income.photo = null
                return income
            }
        })
        const incomes = await Promise.all(mapReadYearIncomesResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: incomes
        }
        return response
    }
}