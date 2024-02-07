'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdatePainInterface } from '../domain/interface/UpdatePain.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePainApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdatePainInterface): Promise<Result> {
        const updatePainResult = await this.endodonticsRepository.updatePain(data)
        if(!updatePainResult) {
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