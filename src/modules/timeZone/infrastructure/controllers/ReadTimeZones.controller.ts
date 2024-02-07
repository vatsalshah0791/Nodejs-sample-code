'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadTimeZonesApplication from '../../application/ReadTimeZones.application'

import { readTimeZonesSchemaParamsType } from '../schemas/readTimeZones.schema'


export default class ReadTimeZonesController {
    constructor(
        private readonly readTimeZonesApplication: ReadTimeZonesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readTimeZonesSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idCountry: req.params.idCountry }
        }
        try {
            const readTimeZonesApplicationResult = await this.readTimeZonesApplication.run(payload.params)
            req.apiResponse = {
                success: readTimeZonesApplicationResult.success,
                message: readTimeZonesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readTimeZonesApplicationResult.success },
                language: { refresh: false },
                data: readTimeZonesApplicationResult.data
            }
            res.status(readTimeZonesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, res)
        }
    }
}