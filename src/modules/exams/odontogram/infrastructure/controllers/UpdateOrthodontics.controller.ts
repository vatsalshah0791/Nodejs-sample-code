'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateOrthodonticsApplication from '../../application/UpdateOrthodontics.application'

import { updateOrthodonticsSchemaBodyType, updateOrthodonticsSchemaParamsType } from '../schemas/updateOrthodontics.schema'


export default class UpdateOrthodonticsController {
    constructor(
        private readonly updateOrthodonticsApplication: UpdateOrthodonticsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateOrthodonticsSchemaParamsType, unknown, updateOrthodonticsSchemaBodyType>,
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
            const updateOrthodonticsApplicationResut = await this.updateOrthodonticsApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateOrthodonticsApplicationResut.success,
                message: updateOrthodonticsApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateOrthodonticsApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateOrthodonticsApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}