'use strict'


import PeriodontogramRepository from '../domain/Periodontogram.repository'

import { ReadPeriodontogramTeethInterface, ReadPeriodontogramTeethResultInterface } from '../domain/interfaces/ReadPeriodontogramTeeth.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadPeriodontogramTeethResultInterface, 'success'>
}


export default class ReadPeriodontogramTeethApplication {
    constructor(private readonly periodontogramRepository: PeriodontogramRepository) {}
    async run(data: ReadPeriodontogramTeethInterface): Promise<Result> {
        const { success, ...readPeriodontogramTeethResult } = await this.periodontogramRepository.readPeriodontogramTeeth(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The periodontograma test for this patient does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readPeriodontogramTeethResult
        }
        return response
    }
}