'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadDayIncomesByTreatmentApplication from '../../application/ReadDayIncomesByTreatment.application'

import { readDayIncomesSchemaBodyType } from '../schemas/readDayIncomes.schema'


export default class ReadDayIncomesByTreatmentController {
    constructor(
        private readonly readDayIncomesByTreatmentApplication: ReadDayIncomesByTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readDayIncomesSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                date: req.body.date
            }
        }
        try {
            const readDayIncomesByTreatmentApplicationResult = await this.readDayIncomesByTreatmentApplication.run(payload.body)
            req.apiResponse = {
                success: readDayIncomesByTreatmentApplicationResult.success,
                message: readDayIncomesByTreatmentApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readDayIncomesByTreatmentApplicationResult.data
            }
            res.status(readDayIncomesByTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}