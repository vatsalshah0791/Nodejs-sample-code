'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadYearVariableExpendsApplication from '../../application/ReadYearVariableExpends.application'

import { readYearVariableExpendsSchemaBodyType } from '../schemas/readYearVariableExpends.schema'


export default class ReadYearVariableExpendsController {
    constructor(
        private readonly readYearVariableExpendsApplication: ReadYearVariableExpendsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readYearVariableExpendsSchemaBodyType>,
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
            const readYearVariableExpendsApplicationResult = await this.readYearVariableExpendsApplication.run(payload.body)
            req.apiResponse = {
                success: readYearVariableExpendsApplicationResult.success,
                message: readYearVariableExpendsApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readYearVariableExpendsApplicationResult.data
            }
            res.status(readYearVariableExpendsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}