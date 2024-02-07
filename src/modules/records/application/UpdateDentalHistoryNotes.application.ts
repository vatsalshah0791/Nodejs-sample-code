'use strict'


import RecordRepository from '../domain/Record.repository'

import { UpdateDentalHistoryNotesInterface } from '../domain/interfaces/UpdateDentalHistoryNotes.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateDentalHistoryNotesApplication {
    constructor(private readonly recordRepository: RecordRepository) {}
    async run(data: UpdateDentalHistoryNotesInterface): Promise<Result> {
        const updateDentalHistoryNotesResult = await this.recordRepository.updateDentalHistoryNotes(data)
        if(!updateDentalHistoryNotesResult) {
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