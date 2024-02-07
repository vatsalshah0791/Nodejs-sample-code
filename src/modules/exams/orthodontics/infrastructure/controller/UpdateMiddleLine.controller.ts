'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateMiddleLineApplication from '../../application/UpdateMiddleLine.application'

import { updateMiddleLineSchemaBodyType, updateMiddleLineSchemaParamsType } from '../schema/updateMiddleLine.schema'


export default class UpdateMiddleLineController {
    constructor(
        private readonly updateMiddleLineApplication: UpdateMiddleLineApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateMiddleLineSchemaParamsType, unknown, updateMiddleLineSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                coincident: req.body.coincident,
                mandibular: req.body.mandibular,
                maxillary: req.body.maxillary
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateMiddleLineApplicationResult = await this.updateMiddleLineApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateMiddleLineApplicationResult.success,
                message: updateMiddleLineApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateMiddleLineApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateMiddleLineApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}