'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPatientsStatisticsApplication from '../../application/ReadPatientsStatistics.application'

import { readPatientsStatisticsSchemaParamsType } from '../schemas/readPatientsStatistics.schema'


export default class ReadPatientsStatisticsController {
    constructor(
        private readonly readPatientsStatisticsApplication: ReadPatientsStatisticsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPatientsStatisticsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                id: req.params.id
            }
        }
        try {
            const readPatientsStatisticsApplicationResult = await this.readPatientsStatisticsApplication.run(payload.params)
            req.apiResponse = {
                success: readPatientsStatisticsApplicationResult.success,
                message: readPatientsStatisticsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPatientsStatisticsApplicationResult.success},
                language: { refresh: false },
                data: readPatientsStatisticsApplicationResult.data
            }
            res.status(readPatientsStatisticsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}