'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateXRaysInterface } from '../domain/interface/UpdateXRays.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateXRaysApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateXRaysInterface): Promise<Result> {
        const updateXRaysResult = await this.endodonticsRepository.updateXRays(data)
        if(!updateXRaysResult) {
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