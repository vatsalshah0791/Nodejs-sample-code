'use strict'


import DentalChairRepository from '../domain/DentalChair.repository'

import { DeleteDentalChairInterface } from '../domain/interfaces/DeleteDentalChair.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteDentalChairApplication {
    constructor(private readonly dentalChairRepository: DentalChairRepository) {}
    async run(data: DeleteDentalChairInterface): Promise<Result> {
        const deleteDentalChairResult = await this.dentalChairRepository.deleteDentalChair(data)
        if(!deleteDentalChairResult) {
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