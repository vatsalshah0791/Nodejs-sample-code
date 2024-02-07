'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPatientDentalTreatmentsDraftsApplication from '../../application/ReadPatientDentalTreatmentsDrafts.application'

import { readPatientDentalTreatmentsDraftsSchemaParamsType } from '../schemas/readPatientDentalTreatmentsDrafts.schema'


export default class ReadPatientDentalTreatmentsDraftsController {
    constructor(
        private readonly readPatientDentalTreatmentsDraftsApplication: ReadPatientDentalTreatmentsDraftsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPatientDentalTreatmentsDraftsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idPatient: req.params.idPatient }
        }
        try {
            const readPatientDentalTreatmentsDraftsApplicationResult = await this.readPatientDentalTreatmentsDraftsApplication.run(payload.params)
            req.apiResponse = {
                success: readPatientDentalTreatmentsDraftsApplicationResult.success,
                message: readPatientDentalTreatmentsDraftsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPatientDentalTreatmentsDraftsApplicationResult.success },
                language: { refresh: false },
                data: readPatientDentalTreatmentsDraftsApplicationResult.data
            }
            res.status(readPatientDentalTreatmentsDraftsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}