'use strict'


import RecordRepository from '../domain/Record.repository'

import { UpdateMedicalHistoryNotesInterface } from '../domain/interfaces/UpdateMedicalHistoryNotes.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateMedicalHistoryNotesApplication {
    constructor(private readonly recordRepository: RecordRepository) {}
    async run(data: UpdateMedicalHistoryNotesInterface): Promise<Result> {
        const updateMedicalHistoryNotesResult = await this.recordRepository.updateMedicalHistoryNotes(data)
        if(!updateMedicalHistoryNotesResult) {
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
        }
        return response
    }
}