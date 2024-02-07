'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadInventoryByYearApplication from '../../application/ReadInventoryByYear.application'

import { readInventoryYearSchemaBodyType } from '../schemas/readInventoryYear.schema'

export default class ReadInventoryByYearController {
    constructor(
        private readonly readInventoryByYearApplication: ReadInventoryByYearApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readInventoryYearSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const body = {
            idClinic: req.body.idClinic,
            year: req.body.year
        }
        try {
            const readInventoryByYearApplicationResult = await this.readInventoryByYearApplication.run(body)
            req.apiResponse = {
                success: readInventoryByYearApplicationResult.success,
                message: readInventoryByYearApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readInventoryByYearApplicationResult.success},
                language: readInventoryByYearApplicationResult.language,
                data: readInventoryByYearApplicationResult.data
            }
            res.status(readInventoryByYearApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}