'use strict'


import PeriodontogramRepository from '../domain/Periodontogram.repository'

import { UpdateFurcationInjuryInterface } from '../domain/interfaces/UpdateFurcationInjury.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateFurcationInjuryApplication {
    constructor(private readonly periodontogramRepository: PeriodontogramRepository) {}
    async run (data: UpdateFurcationInjuryInterface): Promise<Result> {
        const updateFurcationInjuryResult = await this.periodontogramRepository.updateFurcationInjury(data)
        if(!updateFurcationInjuryResult) {
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