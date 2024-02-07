'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { UpdateOrthodonticsInterface } from '../domain/interfaces/UpdateOrthodontics.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateOrthodonticsApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run (data: UpdateOrthodonticsInterface): Promise<Result> {
        const updateOrthodonticsResult = await this.odontogramRepository.updateOrthodontics(data)
        if(!updateOrthodonticsResult) {
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