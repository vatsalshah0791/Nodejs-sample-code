'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadFixedCostsByMonthApplication from '../../application/ReadFixedCostsByMonth.application'

import { readFixedCostsSchemaParamsType } from '../schemas/readFixedCosts.schemas'


export default class ReadFixedCostsByMonthController {
    constructor(
        private readonly readFixedCostsByMonthApplication: ReadFixedCostsByMonthApplication,
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
            const readFixedCostsByMonthApplicationResult = await this.readFixedCostsByMonthApplication.run(payload.params)
            req.apiResponse = {
                success: readFixedCostsByMonthApplicationResult.success,
                message: readFixedCostsByMonthApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readFixedCostsByMonthApplicationResult.success },
                language: { refresh: false },
                data: readFixedCostsByMonthApplicationResult.data
            }
            res.status(readFixedCostsByMonthApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}