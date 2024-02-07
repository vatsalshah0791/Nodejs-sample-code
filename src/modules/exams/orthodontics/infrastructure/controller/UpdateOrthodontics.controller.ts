'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateOrthodonticsApplication from '../../application/UpdateOrthodontics.application'

import { updateOrthodonticsSchemaBodyType, updateOrthodonticsSchemaParamsType } from '../schema/updateOrthodontics.schema'


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
                title: req.body.title,
                value: req.body.value
            },
            params: {
                key: req.params.key,
                id: req.params.id
            }
        }
        try {
            const updateOrthodonticsApplicationResult = await this.updateOrthodonticsApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateOrthodonticsApplicationResult.success,
                message: updateOrthodonticsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateOrthodonticsApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateOrthodonticsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}