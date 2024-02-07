'use strict'


import { NextFunction, Request, Response } from 'express'

import CreatePhotoApplication from '../../application/CreatePhoto.application'

import { createPhotoSchemaBodyType } from '../schemas/createPhoto.schema'


export default class CreatePhotoController {
    constructor(
        private readonly createPhotoApplication: CreatePhotoApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createPhotoSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: { idSmPatient: req.body.idPatient }
        }
        try {
            const photo = req.file ? req.file.key : null
            const createPhotoApplicationResult = await this.createPhotoApplication.run({...payload.body, photo})
            req.apiResponse = {
                success: createPhotoApplicationResult.success,
                message: createPhotoApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createPhotoApplicationResult.success },
                language: { refresh: false },
                data: createPhotoApplicationResult.data
            }
            res.status(createPhotoApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}