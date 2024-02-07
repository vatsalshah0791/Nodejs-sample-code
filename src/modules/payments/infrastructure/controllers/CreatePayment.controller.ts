'use strict'


import { NextFunction, Request, Response } from 'express'

import CreatePaymentApplication from '../../application/CreatePayment.application'

import { createPaymentSchemaBodyType } from '../schemas/createPayment.schema'


export default class CreatePaymentController {
    constructor(
        private readonly createPaymentApplication: CreatePaymentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createPaymentSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                amount: Number(req.body.amount),
                idAppPatientPaymentMethod: req.body.idPaymentMethod,
                idSmCollaborator: req.body.idDoctor,
                idSmPatientDentalTreatment: req.body.idPatientDentalTreatment
            }
        }
        try {
            const createPaymentApplicationResult = await this.createPaymentApplication.run(payload.body)
            req.apiResponse = {
                success: createPaymentApplicationResult.success,
                message: createPaymentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createPaymentApplicationResult.success },
                language: { refresh: false },
                data: createPaymentApplicationResult.data
            }
            res.status(createPaymentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}