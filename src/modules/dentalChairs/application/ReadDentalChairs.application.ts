'use strict'


import DentalChairRepository from '../domain/DentalChair.repository'

import { ReadDentalChairsInterface, ReadDentalChairsResultInterface } from '../domain/interfaces/ReadDentalChairs.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadDentalChairsResultInterface[]
}


export default class ReadDentalChairsApplication {
    constructor(private readonly dentalChairRepository: DentalChairRepository) {}
    async run(data: ReadDentalChairsInterface): Promise<Result> {
        const readDentalChairsResult = await this.dentalChairRepository.readDentalChairs(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readDentalChairsResult
        }
        return response
    }
}