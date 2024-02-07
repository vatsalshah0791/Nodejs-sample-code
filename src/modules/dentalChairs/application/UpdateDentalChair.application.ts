'use strict'


import DentalChairRepository from '../domain/DentalChair.repository'

import { UpdateDentalChairInterface } from '../domain/interfaces/UpdateDentalChair.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateDentalChairApplication {
    constructor(private readonly dentalChairRepository: DentalChairRepository) {}
    async run(data: UpdateDentalChairInterface): Promise<Result> {
        const updateDentalChairResult = await this.dentalChairRepository.updateDentalChair(data)
        if(!updateDentalChairResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The dental chair does not exist'
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