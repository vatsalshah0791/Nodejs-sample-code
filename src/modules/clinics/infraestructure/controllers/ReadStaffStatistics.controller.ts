'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadStaffStatisticsApplication from '../../application/ReadStaffStatistics.application'

import { readStaffStatisticsSchemaParamsType } from '../schemas/readStaffStatistics.schema'


export default class ReadStaffStatisticsController {
    constructor(
        private readonly readStaffStatisticsApplication: ReadStaffStatisticsApplication,
        private readonly errorHandler: Function
    ) {}
    run =async (
        req: Request<readStaffStatisticsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const readStaffStatisticsApplicationResult = await this.readStaffStatisticsApplication.run(payload.params)
            req.apiResponse = {
                success: readStaffStatisticsApplicationResult.success,
                message: readStaffStatisticsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readStaffStatisticsApplicationResult.success },
                language: { refresh: false },
                data: readStaffStatisticsApplicationResult.data
            }
            res.status(readStaffStatisticsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}