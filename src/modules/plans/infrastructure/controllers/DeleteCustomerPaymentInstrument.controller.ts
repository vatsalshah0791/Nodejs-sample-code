'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCustomerApplication from '../../application/ReadCustomer.application'

import deleteCustomerPaymentInstrument from '../cybs/deleteCustomerPaymentInstrument'

import { deleteCustomerPaymentInstrumentSchemaParamsTypes } from '../schemas/deleteCustomerPaymentInstrument.schema'


export default class DeleteCustomerPaymentInstrumentController {
    constructor(
        private readonly readCustomerApplication: ReadCustomerApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deleteCustomerPaymentInstrumentSchemaParamsTypes>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            params: {
                paymentInstrumentId: req.params.paymentInstrumentId
            }
        }
        try {
            const readCustomerApplicationResult = await this.readCustomerApplication.run({ idAccount: payload.idAccount })
            if(!readCustomerApplicationResult.success) {
                req.apiResponse = {
                    success: readCustomerApplicationResult.success,
                    message: readCustomerApplicationResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(readCustomerApplicationResult.statusCode)
                return next()
            }
            if(!readCustomerApplicationResult.data?.customerId) {
                req.apiResponse = {
                    success: false,
                    message: 'No associated client was found.',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(400)
                return next()
            }

            await deleteCustomerPaymentInstrument({
                customerId: readCustomerApplicationResult.data.customerId,
                ...payload.params
            })
            req.apiResponse = {
                success: true,
                message: 'success',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(200)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}