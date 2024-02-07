'use strict'


import IncomeDoctorRepository from '../domain/IncomeDoctor.repository'

import { ReadDayIncomesByDoctorInterface, ReadDayIncomesByDoctorResultInterface } from '../domain/interfaces/ReadDayIncomesByDoctor.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadDayIncomesByDoctorResultInterface[]
}


export default class ReadDayIncomesByDoctorApplication {
    constructor(
        private readonly incomeDoctorRepository: IncomeDoctorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadDayIncomesByDoctorInterface): Promise<Result> {
        const readDayIncomesByDoctorResult = await this.incomeDoctorRepository.readDayIncomesByDoctor(data)
        const mapReadDayIncomesResult = readDayIncomesByDoctorResult.map(async income => {
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