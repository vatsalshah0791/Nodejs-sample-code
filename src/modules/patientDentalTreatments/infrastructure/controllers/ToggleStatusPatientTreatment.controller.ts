'use strict'


import { NextFunction, Request, Response } from 'express'

import ToggleStatusPatientDentalTreatmentApplication from '../../application/ToggleStatusPatientDentalTreatment.application'

import { toggleStatusPatientDentalTreatmentSchemaBodyType, toggleStatusPatientDentalTreatmentSchemaParamsType } from '../schemas/toggleStatusPatientDentalTreatment.schema'


export default class ToggleStatusPatientDentalTreatmentController {
    constructor(
        private readonly toggleStatusPatientDentalTreatmentApplication: ToggleStatusPatientDentalTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<toggleStatusPatientDentalTreatmentSchemaParamsType, unknown, toggleStatusPatientDentalTreatmentSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id },
            body: { status: req.body.status }
        }
        try {
            const toggleStatusPatientDentalTreatmentApplicationResult = await this.toggleStatusPatientDentalTreatmentApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: toggleStatusPatientDentalTreatmentApplicationResult.success,
                message: toggleStatusPatientDentalTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && toggleStatusPatientDentalTreatmentApplicationResult.success},
                language: { refresh: false }
            }
            res.status(toggleStatusPatientDentalTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}