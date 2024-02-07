'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPhotosApplication from '../../application/ReadPhotos.application'

import { readPhotosSchemaParamsType } from '../schemas/readPhotos.schema'


export default class ReadPhotosController {
    constructor(
        private readonly readPhotosApplication: ReadPhotosApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPhotosSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idPatient: req.params.idPatient }
        }
        try {
            const readPhotosApplicationResult = await this.readPhotosApplication.run(payload.params)
            req.apiResponse = {
                success: readPhotosApplicationResult.success,
                message: readPhotosApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPhotosApplicationResult.success },
                language: { refresh: false },
                data: readPhotosApplicationResult.data
            }
            res.status(readPhotosApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}