'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadYearExpensesByProviderTypeApplication from '../../application/ReadYearExpensesByProviderType.application'

import { readYearExpensesByProviderTypeSchemaBodyType } from '../schemas/readYearExpensesByProviderType.schema'


export default class ReadYearExpensesByProviderTypeController {
    constructor(
        private readonly readYearExpensesByProviderTypeApplication: ReadYearExpensesByProviderTypeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readYearExpensesByProviderTypeSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                idProviderType: req.body.idProviderType,
                year: req.body.year
            }
        }
        try {
            const readYearExpensesByProviderTypeApplicationResult = await this.readYearExpensesByProviderTypeApplication.run(payload.body)
            req.apiResponse = {
                success: readYearExpensesByProviderTypeApplicationResult.success,
                message: readYearExpensesByProviderTypeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readYearExpensesByProviderTypeApplicationResult.data
            }
            res.status(readYearExpensesByProviderTypeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}