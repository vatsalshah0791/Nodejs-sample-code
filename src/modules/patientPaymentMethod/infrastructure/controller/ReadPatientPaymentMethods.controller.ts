'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPatientPaymentMethodsApplication from '../../application/ReadPatientPaymentMethods.application'


export default class ReadPatientPaymentMethodController {
    constructor(
        private readonly readPatientPaymentMethodsApplication: ReadPatientPaymentMethodsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readPatientPaymentMethodsApplicationResult = await this.readPatientPaymentMethodsApplication.run()
            req.apiResponse = {
                success: readPatientPaymentMethodsApplicationResult.success,
                message: readPatientPaymentMethodsApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readPatientPaymentMethodsApplicationResult.data
            }
            res.status(readPatientPaymentMethodsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}