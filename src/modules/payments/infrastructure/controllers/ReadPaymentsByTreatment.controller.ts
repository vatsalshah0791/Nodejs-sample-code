'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPaymentsByTreatmentApplication from '../../application/ReadPaymentsByTreatments.application'

import { readPaymentsByTreatmentSchemaParamsType } from '../schemas/readPaymentsByTreatment.schema'


export default class ReadPaymentsByTreatmentController {
    constructor(
        private readonly readPaymentsByTreatmentApplication: ReadPaymentsByTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPaymentsByTreatmentSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idSmPatientDentalTreatment: req.params.idPatientDentalTreatment }
        }
        try {
            const readPaymentsByTreatmentApplicationResult = await this.readPaymentsByTreatmentApplication.run(payload.params)
            req.apiResponse = {
                success: readPaymentsByTreatmentApplicationResult.success,
                message: readPaymentsByTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPaymentsByTreatmentApplicationResult.success },
                language: { refresh: false },
                data: readPaymentsByTreatmentApplicationResult.data
            }
            res.status(readPaymentsByTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}