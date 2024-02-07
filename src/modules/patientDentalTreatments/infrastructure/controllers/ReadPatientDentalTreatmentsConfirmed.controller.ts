'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPatientDentalTreatmentsConfirmedApplication from '../../application/ReadPatientDentalTreatmentsConfirmed.application'

import { readPatientDentalTreatmentsConfirmedSchemaParamsType } from '../schemas/readPatientDentalTreatmentsConfirmed.schema'


export default class ReadPatientDentalTreatmentsConfirmedController {
    constructor(
        private readonly readPatientDentalTreatmentsConfirmedApplication: ReadPatientDentalTreatmentsConfirmedApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPatientDentalTreatmentsConfirmedSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idPatient: req.params.idPatient }
        }
        try {
            const readPatientDentalTreatmentsConfirmedApplicationResult = await this.readPatientDentalTreatmentsConfirmedApplication.run(payload.params)
            req.apiResponse = {
                success: readPatientDentalTreatmentsConfirmedApplicationResult.success,
                message: readPatientDentalTreatmentsConfirmedApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPatientDentalTreatmentsConfirmedApplicationResult.success },
                language: { refresh: false },
                data: readPatientDentalTreatmentsConfirmedApplicationResult.data
            }
            res.status(readPatientDentalTreatmentsConfirmedApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}