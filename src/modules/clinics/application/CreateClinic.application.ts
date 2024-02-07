'use strict'


import ClinicRepository from '../domain/Clinic.repository'

import { CreateClinicInterface } from '../domain/interfaces/CreateClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateClinicApplication {
    constructor(private readonly clinicRepository: ClinicRepository) {}
    async run (data: CreateClinicInterface): Promise<Result> {
        const checkPlanResult = await this.clinicRepository.checkPlan({ idAccount: data.idAccount })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Clinic limit reached'
            }
            return response
        }
        const createClinicResult = await this.clinicRepository.createClinic(data)
        if(!createClinicResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating clinic'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createClinicResult.id }
        }
        return response
    }
}