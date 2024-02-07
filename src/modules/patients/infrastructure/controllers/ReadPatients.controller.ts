'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPatientsApplication from '../../application/ReadPatients.application'

import { readPatientsSchemaParamsType } from '../schemas/readPatients.schema'


export default class ReadPatientsController {
    constructor(
        private readonly readPatientsApplication: ReadPatientsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPatientsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idClinic: req.params.idClinic
            }
        }
        try {
            const readPatientsApplicationResult = await this.readPatientsApplication.run(payload.params)
            req.apiResponse = {
                success: readPatientsApplicationResult.success,
                message: readPatientsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPatientsApplicationResult.success},
                language: { refresh: false },
                data: readPatientsApplicationResult.data
            }
            res.status(readPatientsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}