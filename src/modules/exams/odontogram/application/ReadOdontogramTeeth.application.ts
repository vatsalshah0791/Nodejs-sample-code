'use strict'


import OdontogramRepository from '../domain/Odontogram.repository'

import { ReadOdontogramTeethInterface, ReadOdontogramTeethResultInterface } from '../domain/interfaces/ReadOdontogramTeeth.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadOdontogramTeethResultInterface, 'success'>
}


export default class ReadOdontogramTeethApplication {
    constructor(private readonly odontogramRepository: OdontogramRepository) {}
    async run(data: ReadOdontogramTeethInterface): Promise<Result> {
        const { success, ...readOdontogramTeethResult } = await this.odontogramRepository.readOdontogramTeeth(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The odontogram test for this patient does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readOdontogramTeethResult
        }
        return response
    }
}