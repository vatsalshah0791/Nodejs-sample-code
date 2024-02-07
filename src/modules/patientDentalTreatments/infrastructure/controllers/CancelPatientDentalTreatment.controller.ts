'use strict'


import { NextFunction, Request, Response } from 'express'

import CancelPatientDentalTreatmentApplication from '../../application/CancelPatientDentalTreatment.application'

import { updatePatientDentalTreatmentSchemaParamsType } from '../schemas/updatePatientDentalTreatment.schema'


export default class CancelPatientDentalTreatmentController {
    constructor(
        private readonly cancelPatientDentalTreatmentApplication: CancelPatientDentalTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updatePatientDentalTreatmentSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const cancelPatientDentalTreatmentApplicationResult = await this.cancelPatientDentalTreatmentApplication.run(payload.params)
            req.apiResponse = {
                success: cancelPatientDentalTreatmentApplicationResult.success,
                message: cancelPatientDentalTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && cancelPatientDentalTreatmentApplicationResult.success },
                language: { refresh: false }
            }
            res.status(cancelPatientDentalTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}