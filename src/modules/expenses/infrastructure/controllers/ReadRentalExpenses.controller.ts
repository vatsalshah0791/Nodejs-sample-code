'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadRentalExpensesApplication from '../../application/ReadRentalExpenses.application'

import { readFixedCostsSchemaParamsType } from '../schemas/readFixedCosts.schemas'


export default class ReadRentalExpensesController {
    constructor(
        private readonly readRentalExpensesApplication: ReadRentalExpensesApplication,
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
            const readRentalExpensesApplicationResult = await this.readRentalExpensesApplication.run(payload.params)
            req.apiResponse = {
                success: readRentalExpensesApplicationResult.success,
                message: readRentalExpensesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readRentalExpensesApplicationResult.success },
                language: { refresh: false },
                data: readRentalExpensesApplicationResult.data
            }
            res.status(readRentalExpensesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}