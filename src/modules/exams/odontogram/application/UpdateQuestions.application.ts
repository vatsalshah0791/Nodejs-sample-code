'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { UpdateQuestionsInterface } from '../domain/interfaces/UpdateQuestions.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateQuestionsApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run (data: UpdateQuestionsInterface): Promise<Result> {
        const updateQuestionsResult = await this.odontogramRepository.updateQuestions(data)
        if(!updateQuestionsResult) {
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