'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { UpdateEndodonticsInterface } from '../domain/interfaces/UpdateEndodontics.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateEndodonticsApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run (data: UpdateEndodonticsInterface): Promise<Result> {
        const updateEndodonticsResult = await this.odontogramRepository.updateEndodontics(data)
        if(!updateEndodonticsResult) {
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