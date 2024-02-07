'use strict'


import { Request, Response, NextFunction } from 'express'

import UpdatePhotoApplication from '../../application/UpdatePhoto.application'


export default class UpdatePhotoController {
    constructor(
        private readonly updatePhotoApplication: UpdatePhotoApplication,
        private readonly errorHandler: Function
    ){}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idAccount: req.idAccount,
            photo: req.file ? req.file.key : null
        }
        try {
            const updatePhotoApplicationResult = await this.updatePhotoApplication.run(payload)
            req.apiResponse = {
                success: updatePhotoApplicationResult.success,
                message: updatePhotoApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePhotoApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updatePhotoApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}