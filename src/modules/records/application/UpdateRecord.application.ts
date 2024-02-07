'use strict'


import RecordRepository from '../domain/Record.repository'

import { UpdateRecordInterface } from '../domain/interfaces/UpdateRecord.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateRecordApplication {
    constructor(private readonly recordRepository: RecordRepository) {}
    async run(data: UpdateRecordInterface): Promise<Result> {
        const checkColumnNameExistsResult = await this.recordRepository.checkColumnNameExists({ key: data.key })
        if(!checkColumnNameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'This patient does not have a medical and dental record with the key provided'
            }
            return response
        }
        const updateRecordResult = await this.recordRepository.updateRecord(data)
        if(!updateRecordResult) {
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
            message: 'Success'
        }
        return response
    }
}