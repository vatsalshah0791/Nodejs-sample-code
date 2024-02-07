'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateDentalTreatmentApplication from '../../application/CreateDentalTreatment.application'

import { createDentalTreatmentSchemaBodyType } from '../schemas/createDentalTreatment.schema'


export default class CreateDentalTreatmentController {
    constructor(
        private readonly createDentalTreatmentApplication: CreateDentalTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createDentalTreatmentSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                treatmentName: req.body.treatmentName,
                price: Number(req.body.price),
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createDentalTreatmentApplicationResult = await this.createDentalTreatmentApplication.run(payload.body)
            req.apiResponse = {
                success: createDentalTreatmentApplicationResult.success,
                message: createDentalTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createDentalTreatmentApplicationResult.success },
                language: { refresh: false },
                data: createDentalTreatmentApplicationResult.data
            }
            res.status(createDentalTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}