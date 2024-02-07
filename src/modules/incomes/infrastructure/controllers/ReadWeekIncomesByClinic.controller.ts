'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadWeekIncomesByClinicApplication from '../../application/ReadWeekIncomesByClinic.application'

import { readWeekIncomesSchemaBodyType } from '../schemas/readWeekIncomes.schema'


export default class ReadWeekIncomesByClinicController {
    constructor(
        private readonly readWeekIncomesByClinicApplication: ReadWeekIncomesByClinicApplication,
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
            const readWeekIncomesByClinicApplicationResult = await this.readWeekIncomesByClinicApplication.run(payload.body)
            req.apiResponse = {
                success: readWeekIncomesByClinicApplicationResult.success,
                message: readWeekIncomesByClinicApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readWeekIncomesByClinicApplicationResult.data
            }
            res.status(readWeekIncomesByClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}