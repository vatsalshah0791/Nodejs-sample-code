'use strict'


import AtmRepository from '../domain/Atm.repository'

import { UpdateExamNotesInterface } from '../domain/interface/UpdateExamNotes.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateExamNotesApplication {
    constructor(private readonly atmRepository: AtmRepository) {}
    async run (data: UpdateExamNotesInterface): Promise<Result> {
        const atmRepositoryResult = await this.atmRepository.updateExamNotes(data)
        if(!atmRepositoryResult) {
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