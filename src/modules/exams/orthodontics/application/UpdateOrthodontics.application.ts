'use strict'


import OrthodonticsRepository from '../domain/Orthodontics.repository'

import { UpdateOrthodonticsInterface } from '../domain/interface/UpdateOrthodontics.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateOrthodonticsApplication {
    constructor(private readonly orthodonticsRepository: OrthodonticsRepository) {}
    async run (data: UpdateOrthodonticsInterface): Promise<Result> {
        const checkColumnNameExistsResult = await this.orthodonticsRepository.checkColumnNameExists({ key: data.key })
        if(!checkColumnNameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'This patient does not have a orthodontics exam with the key provided'
            }
            return response
        }
        const updateOrthodonticsResult = await this.orthodonticsRepository.updateOrthodontics(data)
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