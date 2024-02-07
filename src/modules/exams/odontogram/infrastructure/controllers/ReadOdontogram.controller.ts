'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadOdontogramApplication from '../../application/ReadOdontogram.application'

import { readOdontogramSchemaParamsType } from '../schemas/readOdontogram.schema'


export default class ReadOdontogramController {
    constructor(
        private readonly readOdontogramApplication: ReadOdontogramApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readOdontogramSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readOdontogramApplicationResult = await this.readOdontogramApplication.run(payload.params)
            req.apiResponse = {
                success: readOdontogramApplicationResult.success,
                message: readOdontogramApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readOdontogramApplicationResult.success },
                language: { refresh: false },
                data: readOdontogramApplicationResult.data
            }
            res.status(readOdontogramApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}