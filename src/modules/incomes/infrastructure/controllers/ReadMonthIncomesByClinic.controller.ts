'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadMonthIncomesByClinicApplication from '../../application/ReadMonthIncomesByClinic.application'

import { readMonthIncomesSchemaBodyType } from '../schemas/readMonthIncomes.schema'


export default class ReadMonthIncomesByClinicController {
    constructor(
        private readonly readMonthIncomesByClinicApplication: ReadMonthIncomesByClinicApplication,
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
            const readMonthIncomesByClinicApplicationResult = await this.readMonthIncomesByClinicApplication.run(payload.body)
            req.apiResponse = {
                success: readMonthIncomesByClinicApplicationResult.success,
                message: readMonthIncomesByClinicApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readMonthIncomesByClinicApplicationResult.data
            }
            res.status(readMonthIncomesByClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}