'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadDentalTreatmentsApplication from '../../application/ReadDentalTreatments.application'

import { readDentalTreatmentsSchemaParamsType } from '../schemas/readDentalTreatment.schema'


export default class ReadDentalTreatmentsController {
    constructor(
        private readonly readDentalTreatmentsApplication: ReadDentalTreatmentsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readDentalTreatmentsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idClinic: req.params.idClinic }
        }
        try {
            const readDentalTreatmentsApplicationResult = await this.readDentalTreatmentsApplication.run(payload.params)
            req.apiResponse = {
                success: readDentalTreatmentsApplicationResult.success,
                message: readDentalTreatmentsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readDentalTreatmentsApplicationResult.success },
                language: { refresh: false },
                data: readDentalTreatmentsApplicationResult.data
            }
            res.status(readDentalTreatmentsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}