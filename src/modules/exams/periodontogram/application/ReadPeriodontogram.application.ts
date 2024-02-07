'use strict'


import PeriodontogramRepository from '../domain/Periodontogram.repository'

import { ReadPeriodontogramInterface, ReadPeriodontogramResultInterface } from '../domain/interfaces/ReadPeriodontogram.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPeriodontogramResultInterface[]
}


export default class ReadPeriodontogramApplication {
    constructor(private readonly periodontogramRepository: PeriodontogramRepository) {}
    async run(data: ReadPeriodontogramInterface): Promise<Result> {
        const readPeriodontogramResult = await this.periodontogramRepository.readPeriodontogram(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readPeriodontogramResult
        }
        return response
    }
}