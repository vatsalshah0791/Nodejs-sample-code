'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateDuctsInterface } from '../domain/interface/UpdateDucts.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateDuctsApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateDuctsInterface): Promise<Result> {
        const updateDuctsResult = await this.endodonticsRepository.updateDucts(data)
        if(!updateDuctsResult) {
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