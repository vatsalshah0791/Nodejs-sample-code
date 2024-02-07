'use strict'


import OrthodonticsRepository from '../domain/Orthodontics.repository'

import { ReadOrthodonticsInterface, ReadOrthodonticsResultInterface } from '../domain/interface/ReadOrthodontics'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadOrthodonticsResultInterface, 'success'>
}


export default class ReadOrthodonticsApplication {
    constructor(private readonly orthodonticsRepository: OrthodonticsRepository) {}
    async run(data: ReadOrthodonticsInterface): Promise<Result> {
        const { success, ...readOrthodonticsResult } = await this.orthodonticsRepository.readOrthodontics(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The orthodontic test for this patient does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readOrthodonticsResult
        }
        return response
    }
}