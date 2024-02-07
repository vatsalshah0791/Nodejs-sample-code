'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateProsthesisApplication from '../../application/UpdateProsthesis.application'

import { updateProsthesisSchemaBodyType, updateProsthesisSchemaParamsType } from '../schemas/updateProsthesis.schema'


export default class UpdateProsthesisController {
    constructor(
        private readonly updateProsthesisApplication: UpdateProsthesisApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateProsthesisSchemaParamsType, unknown, updateProsthesisSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                value: req.body.value
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateProsthesisApplicationResut = await this.updateProsthesisApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateProsthesisApplicationResut.success,
                message: updateProsthesisApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateProsthesisApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateProsthesisApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}