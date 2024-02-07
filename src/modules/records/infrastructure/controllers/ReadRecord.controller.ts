'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadRecordApplication from '../../application/ReadRecord.application'

import { readRecordSchemaParamsType } from '../schemas/readRecord.schema'


export default class ReadRecordController {
    constructor(
        private readonly readRecordApplication: ReadRecordApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readRecordSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readRecordApplicationResult = await this.readRecordApplication.run(payload.params)
            req.apiResponse = {
                success: readRecordApplicationResult.success,
                message: readRecordApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readRecordApplicationResult.success },
                language: { refresh: false },
                data: readRecordApplicationResult.data
            }
            res.status(readRecordApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}