'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadClinicApplication from '../../application/ReadClinic.application'

import { readClinicSchemaParamsType } from '../schemas/readClinic.schema'


export default class ReadClinicController {
    constructor(
        private readonly readClinicApplication: ReadClinicApplication,
        private readonly errorHandler: Function
    ) {}
    run =async (
        req: Request<readClinicSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const readClinicApplicationResult = await this.readClinicApplication.run(payload.params)
            req.apiResponse = {
                success: readClinicApplicationResult.success,
                message: readClinicApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readClinicApplicationResult.success },
                language: { refresh: false },
                data: readClinicApplicationResult.data
            }
            res.status(readClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}