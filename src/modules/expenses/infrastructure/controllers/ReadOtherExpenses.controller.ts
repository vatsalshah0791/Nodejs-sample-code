'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadOtherExpensesApplication from '../../application/ReadOtherExpenses.application'

import { readFixedCostsSchemaParamsType } from '../schemas/readFixedCosts.schemas'


export default class ReadOtherExpensesController {
    constructor(
        private readonly readOtherExpensesApplication: ReadOtherExpensesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readFixedCostsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idSmClinic: req.params.idClinic }
        }
        try {
            const readOtherExpensesApplicationResult = await this.readOtherExpensesApplication.run(payload.params)
            req.apiResponse = {
                success: readOtherExpensesApplicationResult.success,
                message: readOtherExpensesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readOtherExpensesApplicationResult.success },
                language: { refresh: false },
                data: readOtherExpensesApplicationResult.data
            }
            res.status(readOtherExpensesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}