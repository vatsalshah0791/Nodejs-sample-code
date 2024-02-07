'use strict'


import AtmRepository from '../domain/Atm.repository'

import { ReadAtmInterface, ReadAtmResultInterface } from '../domain/interface/ReadAtm.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadAtmResultInterface, 'success'>
}


export default class ReadAtmApplication {
    constructor(private readonly atmRepository: AtmRepository) {}
    async run(data: ReadAtmInterface): Promise<Result> {
        const { success, ...readAtmResult } = await this.atmRepository.readAtm(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The atm test for this patient does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readAtmResult
        }
        return response
    }
}