'use strict'


import ClinicRepository from '../domain/Clinic.repository'

import { UpdateClinicInterface } from '../domain/interfaces/UpdateClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}

export default class UpdateClinicApplication {
    constructor(private readonly clinicRepository: ClinicRepository) {}
    async run (data: UpdateClinicInterface): Promise<Result> {
        const updateClinicResult = await this.clinicRepository.updateClinic(data)
        if(!updateClinicResult) {
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