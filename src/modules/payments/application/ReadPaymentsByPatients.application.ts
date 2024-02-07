'use strict'


import PayRepository from '../domain/Pay.repository'

import { ReadPaymentsByPatientInterface, ReadPaymentsByPatientResultInterface } from '../domain/interfaces/ReadPaymentsByPatient.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPaymentsByPatientResultInterface[]
}


export default class ReadPaymentsByPatientsApplication {
    constructor(private readonly payRepository: PayRepository) {}
    async run(data: ReadPaymentsByPatientInterface): Promise<Result> {
        const readPaymentsPatientReuslt = await this.payRepository.readPaymentsByPatient(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readPaymentsPatientReuslt
        }
        return response
    }
}