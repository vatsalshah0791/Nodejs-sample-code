'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { ReadEndodonticsInterface, ReadEndodonticsResultInterface } from '../domain/interface/ReadEndodontics.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadEndodonticsResultInterface, 'success'>
}


export default class ReadEndodonticsApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run(data: ReadEndodonticsInterface): Promise<Result> {
        const { success, ...readEndodonticsResult } = await this.endodonticsRepository.readEndodontics(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The endodontics test for this patient does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readEndodonticsResult
        }
        return response
    }
}