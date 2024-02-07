'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPeriodontogramApplication from '../../application/ReadPeriodontogram.application'

import { readPeriodontogramSchemaParamsType } from '../schemas/readPeriodontogram.schema'


export default class ReadPeriodontogramController {
    constructor(
        private readonly readPeriodontogramApplication: ReadPeriodontogramApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPeriodontogramSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readPeriodontogramApplicationResult = await this.readPeriodontogramApplication.run(payload.params)
            req.apiResponse = {
                success: readPeriodontogramApplicationResult.success,
                message: readPeriodontogramApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPeriodontogramApplicationResult.success },
                language: { refresh: false },
                data: readPeriodontogramApplicationResult.data
            }
            res.status(readPeriodontogramApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}