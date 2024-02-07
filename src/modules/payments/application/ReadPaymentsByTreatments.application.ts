'use strict'


import PayRepository from '../domain/Pay.repository'

import { ReadPaymentsByTreatmentInterface, ReadPaymentsByTreatmentResultInterface } from '../domain/interfaces/ReadPaymentsByTreatment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPaymentsByTreatmentResultInterface[]
}


export default class ReadPaymentsByTreatmentApplication {
    constructor(private readonly payRepository: PayRepository) {}
    async run(data: ReadPaymentsByTreatmentInterface): Promise<Result> {
        const readPaymentsTreatmentReuslt = await this.payRepository.readPaymentsByTreatment(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readPaymentsTreatmentReuslt
        }
        return response
    }
}