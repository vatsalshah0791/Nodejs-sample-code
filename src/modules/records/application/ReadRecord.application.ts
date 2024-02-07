'use strict'


import RecordRepository from '../domain/Record.repository'

import { ReadRecordInterface, ReadRecordResultInterface } from '../domain/interfaces/ReadRecord.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadRecordResultInterface, 'success'>
}


export default class ReadRecordApplication {
    constructor(private readonly recordRepository: RecordRepository) {}
    async run(data: ReadRecordInterface): Promise<Result> {
        const { success, ...readRecordResult } = await this.recordRepository.readRecord(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The medical and dental history of this patient does not exist'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readRecordResult
        }
        return response
    }
}