'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCustomerApplication from '../../application/ReadCustomer.application'

import listPaymentInstrumentsForACustomer from '../cybs/listPaymentInstrumentsForACustomer'


export default class GetListPaymentInstrumentByCustomerController {
    constructor(
        private readonly readCustomerApplication: ReadCustomerApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const readCustomerApplicationResult = await this.readCustomerApplication.run(payload)
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

            const getListPaymentInstrumentForCustomerResult = await listPaymentInstrumentsForACustomer({
                customerTokenId: readCustomerApplicationResult.data.customerId
            })
            req.apiResponse = {
                success: true,
                message: 'Success.',
                accessToken: { refresh: false },
                language: { refresh: false },
                data: getListPaymentInstrumentForCustomerResult
            }
            res.status(200)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}
