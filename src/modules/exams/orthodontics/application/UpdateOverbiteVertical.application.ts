'use strict'


import OrthodonticsRepository from '../domain/Orthodontics.repository'

import { UpdateOverbiteVerticalInterface } from '../domain/interface/UpdateOverbiteVertical.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateOverbiteVerticalApplication {
    constructor(private readonly orthodonticsRepository: OrthodonticsRepository) {}
    async run (data: UpdateOverbiteVerticalInterface): Promise<Result> {
        const updateOverbiteVerticalResult = await this.orthodonticsRepository.updateOverbiteVertical(data)
        if(!updateOverbiteVerticalResult) {
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