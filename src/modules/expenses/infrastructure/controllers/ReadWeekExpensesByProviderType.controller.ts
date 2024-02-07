'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadWeekExpensesByProviderTypeApplication from '../../application/ReadWeekExpensesByProviderType.application'

import { readWeekExpensesByProviderTypeSchemaBodyType } from '../schemas/readWeekExpensesByProviderType.schema'


export default class ReadWeekExpensesByProviderTypeController {
    constructor(
        private readonly readWeekExpensesByProviderTypeApplication: ReadWeekExpensesByProviderTypeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readWeekExpensesByProviderTypeSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                idProviderType: req.body.idProviderType,
                week: req.body.week,
                month: req.body.month,
                year: req.body.year
            }
        }
        try {
            const readWeekExpensesByProviderTypeApplicationResult = await this.readWeekExpensesByProviderTypeApplication.run(payload.body)
            req.apiResponse = {
                success: readWeekExpensesByProviderTypeApplicationResult.success,
                message: readWeekExpensesByProviderTypeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readWeekExpensesByProviderTypeApplicationResult.data
            }
            res.status(readWeekExpensesByProviderTypeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}