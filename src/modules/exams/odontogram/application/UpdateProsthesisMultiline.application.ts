'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { UpdateProsthesisMultilineInterface } from '../domain/interfaces/UpdateProsthesisMultiline.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateProsthesisMultilineApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run (data: UpdateProsthesisMultilineInterface): Promise<Result> {
        const updateProsthesisMultilineResult = await this.odontogramRepository.updateProsthesisMultiline(data)
        if(!updateProsthesisMultilineResult) {
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