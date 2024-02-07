'use strict'


import PeriodontogramRepository from '../domain/Periodontogram.repository'

import { UpdateGingivalMarginInterface } from '../domain/interfaces/UpdateGingivalMargin.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateGingivalMarginApplication {
    constructor(private readonly periodontogramRepository: PeriodontogramRepository) {}
    async run (data: UpdateGingivalMarginInterface): Promise<Result> {
        const updateGingivalMarginResult = await this.periodontogramRepository.updateGingivalMargin(data)
        if(!updateGingivalMarginResult) {
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