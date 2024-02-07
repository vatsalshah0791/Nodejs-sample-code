'use strict'


import PeriodontogramRepository from '../domain/Periodontogram.repository'

import { UpdatePeriodontalPocketInterface } from '../domain/interfaces/UpdatePeriodontalPocket.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePeriodontalPocketApplication {
    constructor(private readonly periodontogramRepository: PeriodontogramRepository) {}
    async run (data: UpdatePeriodontalPocketInterface): Promise<Result> {
        const updatePeriodontalPocketResult = await this.periodontogramRepository.updatePeriodontalPocket(data)
        if(!updatePeriodontalPocketResult) {
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