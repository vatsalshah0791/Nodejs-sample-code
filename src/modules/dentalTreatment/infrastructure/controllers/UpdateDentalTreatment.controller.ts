'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateDentalTreatmentAppliation from '../../application/UpdateDentalTreatment.application'

import { updateDentalTreatmentSchemaBodyType, updateDentalTreatmentSchemaParamsType } from '../schemas/updateDentalTreatment.schema'


export default class UpdateDentalTreatmentController {
    constructor(
        private readonly updateDentalTreatmentAppliation: UpdateDentalTreatmentAppliation,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateDentalTreatmentSchemaParamsType, unknown, updateDentalTreatmentSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                treatmentName: req.body.treatmentName,
                price: Number(req.body.price)
            },
            params: { id: req.params.id }
        }
        try {
            const updateDentalTreatmentAppliationResult = await this.updateDentalTreatmentAppliation.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateDentalTreatmentAppliationResult.success,
                message: updateDentalTreatmentAppliationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateDentalTreatmentAppliationResult.success },
                language: { refresh: false }
            }
            res.status(updateDentalTreatmentAppliationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}