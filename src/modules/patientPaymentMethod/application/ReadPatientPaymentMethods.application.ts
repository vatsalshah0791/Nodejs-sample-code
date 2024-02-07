'use strict'


import PatientPaymentMethodRepository from '../domain/PatientPaymentMethod.repository'

import { ReadPatientPaymentMethodResultInterface } from '../domain/interfaces/ReadPatientPaymentMethod.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPatientPaymentMethodResultInterface[]
}


export default class ReadPatientPaymentMethodsApplication {
    constructor(private readonly patientPaymentMethodRepository: PatientPaymentMethodRepository) {}
    async run(): Promise<Result> {
        const readPatientPaymentMethodsResult = await this.patientPaymentMethodRepository.readPatientPaymentMethods()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readPatientPaymentMethodsResult
        }
        return response
    }
}