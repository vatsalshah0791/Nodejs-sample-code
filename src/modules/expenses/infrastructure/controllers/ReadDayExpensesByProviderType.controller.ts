'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadDayExpensesByProviderTypeApplication from '../../application/ReadDayExpensesByProviderType.application'

import { readDayExpensesByProviderTypeSchemaBodyType } from '../schemas/readDayExpensesByProviderType.schema'


export default class ReadDayExpensesByProviderTypeController {
    constructor(
        private readonly readDayExpensesByProviderTypeApplication: ReadDayExpensesByProviderTypeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readDayExpensesByProviderTypeSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                idProviderType: req.body.idProviderType,
                date: req.body.date
            }
        }
        try {
            const readDayExpensesByProviderTypeApplicationResult = await this.readDayExpensesByProviderTypeApplication.run(payload.body)
            req.apiResponse = {
                success: readDayExpensesByProviderTypeApplicationResult.success,
                message: readDayExpensesByProviderTypeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readDayExpensesByProviderTypeApplicationResult.data
            }
            res.status(readDayExpensesByProviderTypeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}