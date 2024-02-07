'use strict'


import IncomeClinicRepository from '../domain/IncomeClinic.repository'

import { ReadPercentagesClinicInterface } from '../domain/interfaces/ReadPercentagesClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        total?: number
        projection?: number
        percentagesMonth?: number
        percentagesWeek?: number
        percentagesDay?: number
    }
}


export default class ReadPercentagesClinicApplication {
    constructor(private readonly incomeClinicRepository: IncomeClinicRepository) {}
    async run(data: ReadPercentagesClinicInterface): Promise<Result> {
        const readPercentagesByClinicResult = await this.incomeClinicRepository.readPercentagesByClinic(data)
        if(!readPercentagesByClinicResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The requested percentages do not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: {
                total: readPercentagesByClinicResult.total,
                projection: readPercentagesByClinicResult.projection,
                percentagesMonth: readPercentagesByClinicResult.percentagesMonth,
                percentagesWeek: readPercentagesByClinicResult.percentagesWeek,
                percentagesDay: readPercentagesByClinicResult.percentagesDay
            }
        }
        return response
    }
}