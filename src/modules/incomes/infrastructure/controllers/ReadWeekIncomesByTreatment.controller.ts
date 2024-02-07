'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadWeekIncomesByTreatmentApplication from '../../application/ReadWeekIncomesByTreatment.application'

import { readWeekIncomesSchemaBodyType } from '../schemas/readWeekIncomes.schema'


export default class ReadWeekIncomesByTreatmentController {
    constructor(
        private readonly readWeekIncomesByTreatmentApplication: ReadWeekIncomesByTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readWeekIncomesSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                week: req.body.week,
                month: req.body.month,
                year: req.body.year
            }
        }
        try {
            const readWeekIncomesByTreatmentApplicationResult = await this.readWeekIncomesByTreatmentApplication.run(payload.body)
            req.apiResponse = {
                success: readWeekIncomesByTreatmentApplicationResult.success,
                message: readWeekIncomesByTreatmentApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readWeekIncomesByTreatmentApplicationResult.data
            }
            res.status(readWeekIncomesByTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}