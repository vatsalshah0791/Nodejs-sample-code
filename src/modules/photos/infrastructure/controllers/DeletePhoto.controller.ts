'use strict'


import { NextFunction, Request, Response } from 'express'

import DeletePhotoApplication from '../../application/DeletePhoto.application'

import { deletePhotoSchemaParamsType } from '../schemas/deletePhoto.schema'


export default class DeletePhotoController {
    constructor(
        private readonly deletePhotoApplication: DeletePhotoApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deletePhotoSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const deletePhotoApplicationResult = await this.deletePhotoApplication.run(payload.params)
            req.apiResponse = {
                success: deletePhotoApplicationResult.success,
                message: deletePhotoApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deletePhotoApplicationResult.success },
                language: { refresh: false }
            }
            res.status(deletePhotoApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}