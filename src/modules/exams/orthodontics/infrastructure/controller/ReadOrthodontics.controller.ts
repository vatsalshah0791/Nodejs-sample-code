'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadOrthodonticsApplication from '../../application/ReadOrthodontics.application'

import { readOrthodonticsSchemaParamsType } from '../schema/readOrthodontics.schema'


export default class ReadOrthodonticsController {
    constructor(
        private readonly readOrthodonticsApplication: ReadOrthodonticsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readOrthodonticsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readOrthodonticsApplicationResult = await this.readOrthodonticsApplication.run(payload.params)
            req.apiResponse = {
                success: readOrthodonticsApplicationResult.success,
                message: readOrthodonticsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readOrthodonticsApplicationResult.success },
                language: { refresh: false },
                data: readOrthodonticsApplicationResult.data
            }
            res.status(readOrthodonticsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}