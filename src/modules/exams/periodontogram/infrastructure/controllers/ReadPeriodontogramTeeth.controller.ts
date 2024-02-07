'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPeriodontogramTeethApplication from '../../application/ReadPeriodontogramTeeth.application'

import { readPeriodontogramTeethSchemaParamsType } from '../schemas/readPeriodontogramTeeth.schema'


export default class ReadPeriodontogramTeethController {
    constructor(
        private readonly readPeriodontogramTeethApplication: ReadPeriodontogramTeethApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPeriodontogramTeethSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient,
                teeth: Number(req.params.teeth)
            }
        }
        try {
            const readPeriodontogramTeethApplicationResult = await this.readPeriodontogramTeethApplication.run(payload.params)
            req.apiResponse = {
                success: readPeriodontogramTeethApplicationResult.success,
                message: readPeriodontogramTeethApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPeriodontogramTeethApplicationResult.success },
                language: { refresh: false },
                data: readPeriodontogramTeethApplicationResult.data
            }
            res.status(readPeriodontogramTeethApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}