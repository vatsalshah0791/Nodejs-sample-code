'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPercentagesClinicApplication from '../../application/ReadPercentagesByClinic.application'

import { readYearIncomesSchemaBodyType } from '../schemas/readYearIncomes.schema'


export default class ReadPercentagesClinicController {
    constructor(
        private readonly readPercentagesClinicApplication: ReadPercentagesClinicApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readYearIncomesSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                year: req.body.year
            }
        }
        try {
            const readPercentagesClinicApplicationResult = await this.readPercentagesClinicApplication.run(payload.body)
            req.apiResponse = {
                success: readPercentagesClinicApplicationResult.success,
                message: readPercentagesClinicApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readPercentagesClinicApplicationResult.data
            }
            res.status(readPercentagesClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}