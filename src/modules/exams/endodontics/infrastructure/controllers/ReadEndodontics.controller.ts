'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadEndodonticsApplication from '../../application/ReadEndodontics.application'

import { readEndodonticsSchemaParamsType } from '../schemas/readEndodontics.schemas'


export default class ReadEndodonticsController {
    constructor(
        private readonly readEndodonticsApplication: ReadEndodonticsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readEndodonticsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readEndodonticsApplicationResult = await this.readEndodonticsApplication.run(payload.params)
            req.apiResponse = {
                success: readEndodonticsApplicationResult.success,
                message: readEndodonticsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readEndodonticsApplicationResult.success },
                language: { refresh: false },
                data: readEndodonticsApplicationResult.data
            }
            res.status(readEndodonticsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}