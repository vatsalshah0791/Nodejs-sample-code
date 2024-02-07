'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadMonthExpensesByProviderTypeApplication from '../../application/ReadMonthExpensesByProviderType.application'

import { readMonthExpensesByProviderTypeSchemaBodyType } from '../schemas/readMonthExpensesByProviderType.schema'


export default class ReadMonthExpensesByProviderTypeController {
    constructor(
        private readonly readMonthExpensesByProviderTypeApplication: ReadMonthExpensesByProviderTypeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readMonthExpensesByProviderTypeSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                idProviderType: req.body.idProviderType,
                month: req.body.month,
                year: req.body.year
            }
        }
        try {
            const readMonthExpensesByProviderTypeApplicationResult = await this.readMonthExpensesByProviderTypeApplication.run(payload.body)
            req.apiResponse = {
                success: readMonthExpensesByProviderTypeApplicationResult.success,
                message: readMonthExpensesByProviderTypeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readMonthExpensesByProviderTypeApplicationResult.data
            }
            res.status(readMonthExpensesByProviderTypeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}