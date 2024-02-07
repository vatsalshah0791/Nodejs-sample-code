'use strict'


import ClinicRepository from '../domain/Clinic.repository'

import { UpdateLogoInterface } from '../domain/interfaces/UpdateLogo.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateLogoApplication{
    constructor(
        private readonly clinicRepository: ClinicRepository,
        private readonly deleteObject: (Key: string | null | undefined) => Promise<boolean>
    ) {}
    async run (data: UpdateLogoInterface): Promise<Result> {
        const readLogoKeyResult = await this.clinicRepository.readLogoKey({ id: data.id })
        if(!readLogoKeyResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The clinic does not exist'
            }
            return response
        }
        await this.deleteObject(readLogoKeyResult.logo)
        const updateLogoResult = await this.clinicRepository.updateLogo(data)
        if(!updateLogoResult) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The clinic does not exist'
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