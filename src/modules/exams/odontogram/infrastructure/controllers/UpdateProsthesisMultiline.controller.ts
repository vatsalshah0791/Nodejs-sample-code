'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateProsthesisMultilineApplication from '../../application/UpdateProsthesisMultiline.application'

import { updateProsthesisMultilineSchemaBodyType, updateProsthesisMultilineSchemaParamsType } from '../schemas/updateProsthesisMultiline.schema'


export default class UpdateProsthesisMultilineController {
    constructor(
        private readonly updateProsthesisMultilineApplication: UpdateProsthesisMultilineApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateProsthesisMultilineSchemaParamsType, unknown, updateProsthesisMultilineSchemaBodyType>,
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
            const updateProsthesisMultilineApplicationResut = await this.updateProsthesisMultilineApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateProsthesisMultilineApplicationResut.success,
                message: updateProsthesisMultilineApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateProsthesisMultilineApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateProsthesisMultilineApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}