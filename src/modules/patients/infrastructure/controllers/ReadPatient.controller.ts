'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPatientApplication from '../../application/ReadPatient.application'

import { readPatientSchemaParamsType } from '../schemas/readPatient.schema'


export default class ReadPatientController {
    constructor(
        private readonly readPatientApplication: ReadPatientApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPatientSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                id: req.params.id
            }
        }
        try {
            const readPatientApplicationResult = await this.readPatientApplication.run(payload.params)
            req.apiResponse = {
                success: readPatientApplicationResult.success,
                message: readPatientApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPatientApplicationResult.success},
                language: { refresh: false },
                data: readPatientApplicationResult.data
            }
            res.status(readPatientApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}