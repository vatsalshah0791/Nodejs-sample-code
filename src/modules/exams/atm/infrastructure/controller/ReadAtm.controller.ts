'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadAtmApplication from '../../application/ReadAtm.application'

import { readAtmSchemaParamsType } from '../schema/readAtm.schemas'


export default class ReadAtmController {
    constructor(
        private readonly readAtmApplication: ReadAtmApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readAtmSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readAtmApplicationResult = await this.readAtmApplication.run(payload.params)
            req.apiResponse = {
                success: readAtmApplicationResult.success,
                message: readAtmApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readAtmApplicationResult.success },
                language: { refresh: false },
                data: readAtmApplicationResult.data
            }
            res.status(readAtmApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}