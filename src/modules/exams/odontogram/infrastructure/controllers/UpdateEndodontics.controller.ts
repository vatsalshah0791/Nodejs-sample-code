'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateEndodonticsApplication from '../../application/UpdateEndodontics.application'

import { updateEndodonticsSchemaBodyType, updateEndodonticsSchemaParamsType } from '../schemas/updateEndodontics.schema'


export default class UpdateEndodonticsController {
    constructor(
        private readonly updateEndodonticsApplication: UpdateEndodonticsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateEndodonticsSchemaParamsType, unknown, updateEndodonticsSchemaBodyType>,
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
            const updateEndodonticsApplicationResut = await this.updateEndodonticsApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateEndodonticsApplicationResut.success,
                message: updateEndodonticsApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateEndodonticsApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateEndodonticsApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}