'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadMonthIncomesByTreatmentApplication from '../../application/ReadMonthIncomesByTreatment.application'

import { readMonthIncomesSchemaBodyType } from '../schemas/readMonthIncomes.schema'


export default class ReadMonthIncomesByTreatmentController {
    constructor(
        private readonly readMonthIncomesByTreatmentApplication: ReadMonthIncomesByTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readMonthIncomesSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                month: req.body.month,
                year: req.body.year
            }
        }
        try {
            const readMonthIncomesByTreatmentApplicationResult = await this.readMonthIncomesByTreatmentApplication.run(payload.body)
            req.apiResponse = {
                success: readMonthIncomesByTreatmentApplicationResult.success,
                message: readMonthIncomesByTreatmentApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readMonthIncomesByTreatmentApplicationResult.data
            }
            res.status(readMonthIncomesByTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}