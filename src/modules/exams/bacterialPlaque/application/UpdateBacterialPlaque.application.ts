'use strict'


import BacterialPlaqueRepository from '../domain/BacterialPlaque.repository'

import { UpdateBacterialPlaqueInterface } from '../domain/interface/UpdateBacterialPlaque.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateBacterialPlaqueApplication {
    constructor(private readonly bacterialPlaqueRepository: BacterialPlaqueRepository) {}
    async run (data: UpdateBacterialPlaqueInterface): Promise<Result> {
        const checkColumnNameExistsResult = await this.bacterialPlaqueRepository.checkColumnNameExists({ key: data.key })
        if(!checkColumnNameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'This patient does not have a bacterial plaque exam with the key provided'
            }
            return response
        }
        const updateBacterialPlaqueResult = await this.bacterialPlaqueRepository.updateBacterialPlaque(data)
        if(!updateBacterialPlaqueResult) {
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