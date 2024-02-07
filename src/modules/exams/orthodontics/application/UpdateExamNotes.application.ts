'use strict'


import OrthodonticsRepository from '../domain/Orthodontics.repository'

import { UpdateExamNotesInterface } from '../domain/interface/UpdateExamNotes.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateExamNotesApplication {
    constructor(private readonly orthodonticsRepository: OrthodonticsRepository) {}
    async run (data: UpdateExamNotesInterface): Promise<Result> {
        const updateExamNotesResult = await this.orthodonticsRepository.updateExamNotes(data)
        if(!updateExamNotesResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing the exam.'
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