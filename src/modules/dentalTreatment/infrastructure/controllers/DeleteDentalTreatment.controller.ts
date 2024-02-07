'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteDentalTreatmentApplication from '../../application/DeleteDentalTreatment.application'

import { deleteDentalTreatmentSchemaParamsType } from '../schemas/deleteDentalTreatment.schema'


export default class DeleteDentalTreatmentController {
    constructor(
        private readonly deleteDentalTreatmentApplication: DeleteDentalTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deleteDentalTreatmentSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const deleteDentalTreatmentApplicationResult = await this.deleteDentalTreatmentApplication.run(payload.params)
            req.apiResponse = {
                success: deleteDentalTreatmentApplicationResult.success,
                message: deleteDentalTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteDentalTreatmentApplicationResult.success },
                language: { refresh: false }
            }
            res.status(deleteDentalTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}