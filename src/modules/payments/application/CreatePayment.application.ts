'use strict'


import PayRepository from '../domain/Pay.repository'

import { CreatePaymentInterface } from '../domain/interfaces/CreatePayment.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreatePaymentApplication {
    constructor(private readonly payRepository: PayRepository) {}
    async run(data: CreatePaymentInterface): Promise<Result> {
        const validatePaymentResult = await this.payRepository.validatePayment({
            idSmPatientDentalTreatment: data.idSmPatientDentalTreatment,
            amount: data.amount
        })
        if(!validatePaymentResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'invalid payment'
            }
            return response
        }
        const createPaymentResult = await this.payRepository.createPayment(data)
        if(!createPaymentResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating payment'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createPaymentResult.id }
        }
        return response
    }
}