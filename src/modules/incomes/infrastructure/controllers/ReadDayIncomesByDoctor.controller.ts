'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadDayIncomesByDoctorApplication from '../../application/ReadDayIncomesByDoctor.application'

import { readDayIncomesSchemaBodyType } from '../schemas/readDayIncomes.schema'


export default class ReadDayIncomesByDoctorController {
    constructor(
        private readonly readDayIncomesByDoctorApplication: ReadDayIncomesByDoctorApplication,
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
            const readDayIncomesByDoctorApplicationResult = await this.readDayIncomesByDoctorApplication.run(payload.body)
            req.apiResponse = {
                success: readDayIncomesByDoctorApplicationResult.success,
                message: readDayIncomesByDoctorApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readDayIncomesByDoctorApplicationResult.data
            }
            res.status(readDayIncomesByDoctorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}