'use strict'


import BacterialPlaqueRepository from '../domain/BacterialPlaque.repository'

import { ReadBacterialPlaqueInterface, ReadBacterialPlaqueResultInterface } from '../domain/interface/ReadBacterialPlaque.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadBacterialPlaqueResultInterface, 'success'>
}


export default class ReadBacterialPlaqueApplication {
    constructor(private readonly bacterialPlaqueRepository: BacterialPlaqueRepository) {}
    async run(data: ReadBacterialPlaqueInterface): Promise<Result> {
        const { success, ...readBacterialPlaqueResult } = await this.bacterialPlaqueRepository.readBacterialPlaque(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The bacterial plaque test for this patient does not exist.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readBacterialPlaqueResult
        }
        return response
    }
}