'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadDentalChairsApplication from '../../application/ReadDentalChairs.application'

import { readDentalChairsSchemaParamsType } from '../schemas/readDentalChairs.schema'


export default class ReadDentalChairsController {
    constructor(
        private readonly readDentalChairsApplication: ReadDentalChairsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readDentalChairsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idClinic: req.params.idClinic }
        }
        try {
            const readDentalChairsApplicationResult = await this.readDentalChairsApplication.run(payload.params)
            req.apiResponse = {
                success: readDentalChairsApplicationResult.success,
                message: readDentalChairsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readDentalChairsApplicationResult.success },
                language: { refresh: false },
                data: readDentalChairsApplicationResult.data
            }
            res.status(readDentalChairsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}