'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { ReadOdontogramInterface, ReadOdontogramResultInterface } from '../domain/interfaces/ReadOdontogram.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadOdontogramResultInterface[]
}


export default class ReadOdontogramApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run(data: ReadOdontogramInterface): Promise<Result> {
        const readOdontogramResult = await this.odontogramRepository.readOdontogram(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readOdontogramResult
        }
        return response
    }
}