'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateAtmMultilineApplication from '../../application/UpdateAtmMultiline.application'

import { updateAtmMultilineSchemaBodyType, updateAtmMultilineSchemaParamsType } from '../schema/updateAtmMultiline.schema'


export default class UpdateAtmMultilineController {
    constructor(
        private readonly updateAtmMultilineApplication: UpdateAtmMultilineApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateAtmMultilineSchemaParamsType, unknown, updateAtmMultilineSchemaBodyType>,
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
                key: req.params.key,
                id: req.params.id
            }
        }
        try {
            const updateAtmMultilineApplicationResult = await this.updateAtmMultilineApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateAtmMultilineApplicationResult.success,
                message: updateAtmMultilineApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateAtmMultilineApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateAtmMultilineApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}