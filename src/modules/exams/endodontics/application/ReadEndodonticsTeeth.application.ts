'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { ReadEndodonticsTeethInterface, ReadEndodonticsTeethResultInterface } from '../domain/interface/ReadEndodonticsTeeth.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadEndodonticsTeethResultInterface, 'success'>
}


export default class ReadEndodonticsTeethApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run(data: ReadEndodonticsTeethInterface): Promise<Result> {
        const { success, ...readEndodonticsTeethResult } = await this.endodonticsRepository.readEndodonticsTeeth(data)
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
            data: readEndodonticsTeethResult
        }
        return response
    }
}