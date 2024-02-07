'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { UpdateGeneralOdontologyInterface } from '../domain/interfaces/UpdateGeneralOdontology.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateGeneralOdontologyApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run (data: UpdateGeneralOdontologyInterface): Promise<Result> {
        const updateGeneralOdontologyResult = await this.odontogramRepository.updateGeneralOdontology(data)
        if(!updateGeneralOdontologyResult) {
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