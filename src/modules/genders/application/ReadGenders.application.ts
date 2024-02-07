'use strict'


import GenderRepository from '../domain/Gender.repository'

import { ReadGendersResultInterface } from '../domain/interfaces/RenderGenders.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadGendersResultInterface[]
}

export default class ReadGendersApplication {
    constructor(private readonly genderRepository: GenderRepository) {}
    async run(): Promise<Result> {
        const readGendersResult = await this.genderRepository.readGenders()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readGendersResult
        }
        return response
    }
}