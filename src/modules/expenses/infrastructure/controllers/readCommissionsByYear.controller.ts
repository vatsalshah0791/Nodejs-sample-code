'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCommissionsByYearApplication from '../../application/ReadCommissionsByYear.application'

import { readCommissionsByYearSchemaBodyType } from '../schemas/readCommissionsByYear.schema'


export default class ReadCommissionsByYearController {
    constructor(
        private readonly readCommissionsByYearApplication: ReadCommissionsByYearApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readCommissionsByYearSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                year: req.body.year
            }
        }
        try {
            const readCommissionsByYearApplicationResult = await this.readCommissionsByYearApplication.run(payload.body)
            req.apiResponse = {
                success: readCommissionsByYearApplicationResult.success,
                message: readCommissionsByYearApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readCommissionsByYearApplicationResult.data
            }
            res.status(readCommissionsByYearApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}