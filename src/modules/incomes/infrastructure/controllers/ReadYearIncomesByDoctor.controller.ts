'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadYearIncomesByDoctorApplication from '../../application/ReadYearIncomesByDoctor.application'

import { readYearIncomesSchemaBodyType } from '../schemas/readYearIncomes.schema'


export default class ReadYearIncomesByDoctorController {
    constructor(
        private readonly readYearIncomesByDoctorApplication: ReadYearIncomesByDoctorApplication,
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
            const readYearIncomesByDoctorApplicationResult = await this.readYearIncomesByDoctorApplication.run(payload.body)
            req.apiResponse = {
                success: readYearIncomesByDoctorApplicationResult.success,
                message: readYearIncomesByDoctorApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readYearIncomesByDoctorApplicationResult.data
            }
            res.status(readYearIncomesByDoctorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}