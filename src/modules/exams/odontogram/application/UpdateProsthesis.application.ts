'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { UpdateProsthesisInterface } from '../domain/interfaces/UpdateProsthesis.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateProsthesisApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run (data: UpdateProsthesisInterface): Promise<Result> {
        const updateProsthesisResult = await this.odontogramRepository.updateProsthesis(data)
        if(!updateProsthesisResult) {
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