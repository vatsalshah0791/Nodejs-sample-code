'use strict'


import OrthodonticsRepository from '../domain/Orthodontics.repository'

import { UpdateMiddleLineInterface } from '../domain/interface/UpdateMiddleLine.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateMiddleLineApplication {
    constructor(private readonly orthodonticsRepository: OrthodonticsRepository) {}
    async run (data: UpdateMiddleLineInterface): Promise<Result> {
        const updateMiddleLineResult = await this.orthodonticsRepository.updateMiddleLine(data)
        if(!updateMiddleLineResult) {
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