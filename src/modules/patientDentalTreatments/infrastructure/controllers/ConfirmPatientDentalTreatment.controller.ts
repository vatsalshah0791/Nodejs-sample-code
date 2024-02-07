'use strict'


import { NextFunction, Request, Response } from 'express'

import ConfirmPatientDentalTreatmentApplication from '../../application/ConfirmPatientDentalTreatment.application'

import { updatePatientDentalTreatmentSchemaParamsType } from '../schemas/updatePatientDentalTreatment.schema'


export default class ConfirmPatientDentalTreatmentController {
    constructor(
        private readonly confirmPatientDentalTreatmentApplication: ConfirmPatientDentalTreatmentApplication,
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
            const confirmPatientDentalTreatmentApplicationResult = await this.confirmPatientDentalTreatmentApplication.run(payload.params)
            req.apiResponse = {
                success: confirmPatientDentalTreatmentApplicationResult.success,
                message: confirmPatientDentalTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && confirmPatientDentalTreatmentApplicationResult.success},
                language: { refresh: false }
            }
            res.status(confirmPatientDentalTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}