'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateLogoApplication from '../../application/UpdateLogo.application'

import { UpdateLogoSchemaParamsType } from '../schemas/updateLogo.schema'


export default class UpdateLogoController {
    constructor(
        private readonly updateLogoApplication: UpdateLogoApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<UpdateLogoSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            logo: req.file ? req.file.key : null,
            params: { id: req.params.id }
        }
        try {
            const updateLogoApplicationResult = await this.updateLogoApplication.run({ ...payload.params, logo: payload.logo })
            req.apiResponse = {
                success: updateLogoApplicationResult.success,
                message: updateLogoApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateLogoApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateLogoApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}