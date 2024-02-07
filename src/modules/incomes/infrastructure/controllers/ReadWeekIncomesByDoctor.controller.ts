'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadWeekIncomesByDoctorApplication from '../../application/ReadWeekIncomesByDoctor.application'

import { readWeekIncomesSchemaBodyType } from '../schemas/readWeekIncomes.schema'


export default class ReadWeekIncomesByDoctorController {
    constructor(
        private readonly readWeekIncomesByDoctorApplication: ReadWeekIncomesByDoctorApplication,
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
            const readWeekIncomesByDoctorApplicationResult = await this.readWeekIncomesByDoctorApplication.run(payload.body)
            req.apiResponse = {
                success: readWeekIncomesByDoctorApplicationResult.success,
                message: readWeekIncomesByDoctorApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readWeekIncomesByDoctorApplicationResult.data
            }
            res.status(readWeekIncomesByDoctorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}