'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadServiceExpensesApplication from '../../application/ReadServiceExpenses.application'

import { readFixedCostsSchemaParamsType } from '../schemas/readFixedCosts.schemas'


export default class ReadServiceExpensesController {
    constructor(
        private readonly readServiceExpensesApplication: ReadServiceExpensesApplication,
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
            const readServiceExpensesApplicationResult = await this.readServiceExpensesApplication.run(payload.params)
            req.apiResponse = {
                success: readServiceExpensesApplicationResult.success,
                message: readServiceExpensesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readServiceExpensesApplicationResult.success },
                language: { refresh: false },
                data: readServiceExpensesApplicationResult.data
            }
            res.status(readServiceExpensesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}