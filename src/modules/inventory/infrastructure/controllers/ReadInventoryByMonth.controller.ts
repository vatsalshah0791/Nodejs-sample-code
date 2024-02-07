'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadInventoryByMonthApplication from '../../application/ReadInventoryByMonth.application'

import { readInventoryMonthSchemaBodyType } from '../schemas/readInventoryMonth.schema'

export default class ReadInventoryByMonthController {
    constructor(
        private readonly readInventoryByMonthApplication: ReadInventoryByMonthApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readInventoryMonthSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const body = {
            idClinic: req.body.idClinic,
            year: req.body.year,
            month: req.body.month
        }
        try {
            const readInventoryByMonthApplicationResult = await this.readInventoryByMonthApplication.run(body)
            req.apiResponse = {
                success: readInventoryByMonthApplicationResult.success,
                message: readInventoryByMonthApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readInventoryByMonthApplicationResult.success},
                language: readInventoryByMonthApplicationResult.language,
                data: readInventoryByMonthApplicationResult.data
            }
            res.status(readInventoryByMonthApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}