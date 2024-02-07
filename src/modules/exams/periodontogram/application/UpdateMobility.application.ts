'use strict'


import PeriodontogramRepository from '../domain/Periodontogram.repository'

import { UpdateMobilityInterface } from '../domain/interfaces/UpdateMobility.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateMobilityApplication {
    constructor(private readonly periodontogramRepository: PeriodontogramRepository) {}
    async run (data: UpdateMobilityInterface): Promise<Result> {
        const updateMobilityResult = await this.periodontogramRepository.updateMobility(data)
        if(!updateMobilityResult) {
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