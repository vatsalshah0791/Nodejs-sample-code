'use strict'


import PatientRepository from '../domain/Patient.repository'

import { CreatePatientInterface } from '../domain/interfaces/CreatePatient.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id: string }
}


export default class CreatePatientApplication {
    constructor(private readonly patientRepository: PatientRepository) {}
    async run(data: CreatePatientInterface): Promise<Result> {
        const checkPlanResult = await this.patientRepository.checkPlan({ idClinic: data.idSmClinic })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Patient limit reached'
            }
            return response
        }
        const checkUsernameExistsResult = await this.patientRepository.checkUsernameExists({ username: data.username })
        if(checkUsernameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The username entered is already in use'
            }
            return response
        }
        const createPatientResult = await this.patientRepository.createPatient(data)
        if(!createPatientResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating patient'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: {
                id: createPatientResult.id as string
            }
        }
        return response
    }
}