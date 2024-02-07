'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCustomerApplication from '../../application/ReadCustomer.application'

import updateCustomerPaymentInstrument from '../cybs/updateCustomerPaymentInstrument'

import { updateCustomerPaymentInstrumentSchemaParamsTypes } from '../schemas/updateCustomerPaymentInstrument.schema'


export default class UpdateCustomerPaymentInstrumentController {
    constructor(
        private readonly readCustomerApplication: ReadCustomerApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateCustomerPaymentInstrumentSchemaParamsTypes>,
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

            await updateCustomerPaymentInstrument({
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