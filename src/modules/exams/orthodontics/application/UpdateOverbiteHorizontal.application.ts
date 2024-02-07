'use strict'


import OrthodonticsRepository from '../domain/Orthodontics.repository'

import { UpdateOverbiteHorizontalInterface } from '../domain/interface/UpdateOverbiteHorizontal.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateOverbiteHorizontalApplication {
    constructor(private readonly orthodonticsRepository: OrthodonticsRepository) {}
    async run (data: UpdateOverbiteHorizontalInterface): Promise<Result> {
        const updateOverbiteHorizontalResult = await this.orthodonticsRepository.updateOverbiteHorizontal(data)
        if(!updateOverbiteHorizontalResult) {
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