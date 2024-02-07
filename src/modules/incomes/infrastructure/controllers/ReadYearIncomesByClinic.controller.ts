'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadYearIncomesByClinicApplication from '../../application/ReadYearIncomesByClinic.application'

import { readYearIncomesSchemaBodyType } from '../schemas/readYearIncomes.schema'


export default class ReadYearIncomesByClinicController {
    constructor(
        private readonly readYearIncomesByClinicApplication: ReadYearIncomesByClinicApplication,
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
            const readYearIncomesByClinicApplicationResult = await this.readYearIncomesByClinicApplication.run(payload.body)
            req.apiResponse = {
                success: readYearIncomesByClinicApplicationResult.success,
                message: readYearIncomesByClinicApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readYearIncomesByClinicApplicationResult.data
            }
            res.status(readYearIncomesByClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}