'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadProvidersApplication from '../../application/ReadProviders.application'

import { readProvidersSchemaParamsType } from '../schemas/readProviders.schema'


export default class ReadProvidersController {
    constructor(
        private readonly readProvidersApplication: ReadProvidersApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readProvidersSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idClinic: req.params.idClinic }
        }
        try {
            const readProvidersApplicationResult = await this.readProvidersApplication.run(payload.params)
            req.apiResponse = {
                success: readProvidersApplicationResult.success,
                message: readProvidersApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readProvidersApplicationResult.success },
                language: { refresh: false },
                data: readProvidersApplicationResult.data
            }
            res.status(readProvidersApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}