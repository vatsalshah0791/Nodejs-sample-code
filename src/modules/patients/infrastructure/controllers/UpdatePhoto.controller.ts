'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdatePhotoApplication from '../../application/UpdatePhoto.application'

import { updatePhotoSchemaParamsType } from '../schemas/updatePhoto.schema'


export default class UpdatePhotoController {
    constructor(
        private readonly updatePhotoApplication: UpdatePhotoApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updatePhotoSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                id: req.params.id
            }
        }
        try {
            const photo = req.file ? req.file.key : null
            const updatePhotoApplicationResult = await this.updatePhotoApplication.run({ ...payload.params, photo })
            req.apiResponse = {
                success: updatePhotoApplicationResult.success,
                message: updatePhotoApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePhotoApplicationResult.success},
                language: { refresh: false },
            }
            res.status(updatePhotoApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}