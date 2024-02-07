'use strict'


import BacterialPlaqueRepository from '../domain/BacterialPlaque.repository'

import { UpdateIsAdultInterface } from '../domain/interface/UpdateIsAdult.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateIsAdultApplication {
    constructor(private readonly nacterialPlaqueRepository: BacterialPlaqueRepository) {}
    async run (data: UpdateIsAdultInterface): Promise<Result> {
        const updateIsAdultBacterialPlaqueResult = await this.nacterialPlaqueRepository.updateIsAdult(data)
        if(!updateIsAdultBacterialPlaqueResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing the exam.'
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