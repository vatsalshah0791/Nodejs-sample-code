'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateExamNotesInterface } from '../domain/interface/UpdateExamNotes.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateExamNotesApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateExamNotesInterface): Promise<Result> {
        const updateExamNotesResult = await this.endodonticsRepository.updateExamNotes(data)
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