'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadBillByDateApplication from '../../application/ReadBillByDate.application'

import { readByDateSchemaBodyType } from '../schemas/readByDate.schema'

export default class ReadBillByDateController {
    constructor(
        private readonly readBillByDateApplication: ReadBillByDateApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readByDateSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const body = {
            month: req.body.month,
            year: req.body.year,
            idClinic: req.body.idClinic
        }
        try {
            const readBillByDateApplicationResult = await this.readBillByDateApplication.run(body)
            req.apiResponse = {
                success: readBillByDateApplicationResult.success,
                message: readBillByDateApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readBillByDateApplicationResult.success},
                language: readBillByDateApplicationResult.language,
                data: readBillByDateApplicationResult.data
            }
            res.status(readBillByDateApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}