'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadDayIncomesByClinicApplication from '../../application/ReadDayIncomesByClinic.application'

import { readDayIncomesSchemaBodyType } from '../schemas/readDayIncomes.schema'


export default class ReadDayIncomesByClinicController {
    constructor(
        private readonly readDayIncomesByClinicApplication: ReadDayIncomesByClinicApplication,
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
            const readDayIncomesByClinicApplicationResult = await this.readDayIncomesByClinicApplication.run(payload.body)
            req.apiResponse = {
                success: readDayIncomesByClinicApplicationResult.success,
                message: readDayIncomesByClinicApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readDayIncomesByClinicApplicationResult.data
            }
            res.status(readDayIncomesByClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}