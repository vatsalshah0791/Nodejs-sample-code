'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadOdontogramTeethApplication from '../../application/ReadOdontogramTeeth.application'

import { readOdontogramTeethSchemaParamsType } from '../schemas/readOdontogramTeeth.schema'


export default class ReadOdontogramTeethController {
    constructor(
        private readonly readOdontogramTeethApplication: ReadOdontogramTeethApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readOdontogramTeethSchemaParamsType>,
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
            const readOdontogramTeethApplicationResult = await this.readOdontogramTeethApplication.run(payload.params)
            req.apiResponse = {
                success: readOdontogramTeethApplicationResult.success,
                message: readOdontogramTeethApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readOdontogramTeethApplicationResult.success },
                language: { refresh: false },
                data: readOdontogramTeethApplicationResult.data
            }
            res.status(readOdontogramTeethApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}