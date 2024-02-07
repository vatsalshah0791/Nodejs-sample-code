'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateXRaysApplication from '../../application/UpdateXRays.application'

import { updateXRaysSchemaBodyType, updateXRaysSchemaParamsType } from '../schemas/updateXRays.schema'


export default class UpdateXRaysController {
    constructor(
        private readonly updateXRaysApplication: UpdateXRaysApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateXRaysSchemaParamsType, unknown, updateXRaysSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                title: req.body.title,
                value: req.body.value
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateXRaysApplicationResut = await this.updateXRaysApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateXRaysApplicationResut.success,
                message: updateXRaysApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateXRaysApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateXRaysApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}