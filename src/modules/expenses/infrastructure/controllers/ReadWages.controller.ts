'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadWagesApplication from '../../application/ReadWages.application'

import { readFixedCostsSchemaParamsType } from '../schemas/readFixedCosts.schemas'


export default class ReadWagesController {
    constructor(
        private readonly readWagesApplication: ReadWagesApplication,
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
            const readWagesApplicationResult = await this.readWagesApplication.run(payload.params)
            req.apiResponse = {
                success: readWagesApplicationResult.success,
                message: readWagesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readWagesApplicationResult.success },
                language: { refresh: false },
                data: readWagesApplicationResult.data
            }
            res.status(readWagesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}