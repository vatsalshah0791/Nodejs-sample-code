'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateDuctsApplication from '../../application/UpdateDucts.application'

import { updateDuctsSchemaBodyType, updateDuctsSchemaParamsType } from '../schemas/updateDucts.schema'


export default class UpdateDuctsController {
    constructor(
        private readonly updateDuctsApplication: UpdateDuctsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateDuctsSchemaParamsType, unknown, updateDuctsSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                length: req.body.length,
                instrumentation: req.body.instrumentation
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateDuctsApplicationResut = await this.updateDuctsApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateDuctsApplicationResut.success,
                message: updateDuctsApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateDuctsApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateDuctsApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}