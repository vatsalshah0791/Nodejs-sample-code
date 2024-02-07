'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadMonthIncomesByDoctorApplication from '../../application/ReadMonthIncomesByDoctor.application'

import { readMonthIncomesSchemaBodyType } from '../schemas/readMonthIncomes.schema'


export default class ReadMonthIncomesByDoctorController {
    constructor(
        private readonly readMonthIncomesByDoctorApplication: ReadMonthIncomesByDoctorApplication,
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
            const readMonthIncomesByDoctorApplicationResult = await this.readMonthIncomesByDoctorApplication.run(payload.body)
            req.apiResponse = {
                success: readMonthIncomesByDoctorApplicationResult.success,
                message: readMonthIncomesByDoctorApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readMonthIncomesByDoctorApplicationResult.data
            }
            res.status(readMonthIncomesByDoctorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}