'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadMonthVariableExpendsApplication from '../../application/ReadMonthVariableExpends.application'

import { readMonthVariableExpendsSchemaBodyType } from '../schemas/readMonthVariableExpends.schema'


export default class ReadMonthVariableExpendsController {
    constructor(
        private readonly readMonthVariableExpendsApplication: ReadMonthVariableExpendsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readMonthVariableExpendsSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                month: req.body.month,
                year: req.body.year
            }
        }
        try {
            const readMonthVariableExpendsApplicationResult = await this.readMonthVariableExpendsApplication.run(payload.body)
            req.apiResponse = {
                success: readMonthVariableExpendsApplicationResult.success,
                message: readMonthVariableExpendsApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readMonthVariableExpendsApplicationResult.data
            }
            res.status(readMonthVariableExpendsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}