'use strict'


import PatientRepository from '../domain/Patient.repository'

import { UpdatePatientInterface } from '../domain/interfaces/UpdatePatient.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePatientApplication {
    constructor(private readonly patientRepository: PatientRepository) {}
    async run(data: UpdatePatientInterface) {
        const updatePatientResult = await this.patientRepository.updatePatient(data)
        if(!updatePatientResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The patient does not exist'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
        }
        return response
    }
}