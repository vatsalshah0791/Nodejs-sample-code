'use strict'


import AtmRepository from '../domain/Atm.repository'

import { UpdateAtmInterface } from '../domain/interface/UpdateAtm.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateAtmApplication {
    constructor(private readonly atmRepository: AtmRepository) {}
    async run (data: UpdateAtmInterface): Promise<Result> {
        const checkColumnNameExistsResult = await this.atmRepository.checkColumnNameExists({ key: data.key })
        if(!checkColumnNameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'This patient does not have a atm exam with the key provided'
            }
            return response
        }
        const updateAtmResult = await this.atmRepository.updateAtm(data)
        if(!updateAtmResult) {
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