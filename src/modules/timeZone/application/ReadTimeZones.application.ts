'use strict'


import TimeZoneRepository from '../domain/TimeZone.repository'

import { ReadTimeZoneInterface, ReadTimeZoneResultInterface } from '../domain/interfaces/ReadTimeZone.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadTimeZoneResultInterface[]
}


export default class ReadTimeZonesApplication {
    constructor(private readonly timeZoneRepository: TimeZoneRepository) {}
    async run(data: ReadTimeZoneInterface): Promise<Result> {
        const timeZoneRepositoryResult = await this.timeZoneRepository.readTimeZones(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: timeZoneRepositoryResult
        }
        return response
    }
}