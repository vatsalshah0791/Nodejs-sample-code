'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdatePainApplication from '../../application/UpdatePain.application'

import { updatePainSchemaBodyType, updatePainSchemaParamsType } from '../schemas/updatePain.schema'


export default class UpdatePainController {
    constructor(
        private readonly updatePainApplication: UpdatePainApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updatePainSchemaParamsType, unknown, updatePainSchemaBodyType>,
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
            const updatePainApplicationResut = await this.updatePainApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updatePainApplicationResut.success,
                message: updatePainApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePainApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updatePainApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}