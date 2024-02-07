'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadYearIncomesByTreatmentApplication from '../../application/ReadYearIncomesByTreatment.application'

import { readYearIncomesSchemaBodyType } from '../schemas/readYearIncomes.schema'


export default class ReadYearIncomesByTreatmentController {
    constructor(
        private readonly readYearIncomesByTreatmentApplication: ReadYearIncomesByTreatmentApplication,
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
            const readYearIncomesByTreatmentApplicationResult = await this.readYearIncomesByTreatmentApplication.run(payload.body)
            req.apiResponse = {
                success: readYearIncomesByTreatmentApplicationResult.success,
                message: readYearIncomesByTreatmentApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readYearIncomesByTreatmentApplicationResult.data
            }
            res.status(readYearIncomesByTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}