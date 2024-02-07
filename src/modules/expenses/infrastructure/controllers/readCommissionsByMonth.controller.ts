'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCommissionsByMonthApplication from '../../application/ReadCommissionsByMonth.application'

import { readCommissionsByMonthSchemaBodyType } from '../schemas/readCommissionsByMonth.schema'


export default class ReadCommissionsByMonthController {
    constructor(
        private readonly readCommissionsByMonthApplication: ReadCommissionsByMonthApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readCommissionsByMonthSchemaBodyType>,
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
            const readCommissionsByMonthApplicationResult = await this.readCommissionsByMonthApplication.run(payload.body)
            req.apiResponse = {
                success: readCommissionsByMonthApplicationResult.success,
                message: readCommissionsByMonthApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readCommissionsByMonthApplicationResult.data
            }
            res.status(readCommissionsByMonthApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}