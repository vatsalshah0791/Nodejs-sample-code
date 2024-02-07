'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateOverbiteHorizontalApplication from '../../application/UpdateOverbiteHorizontal.application'

import { updateOverbiteHorizontalSchemaBodyType, updateOverbiteHorizontalSchemaParamsType } from '../schema/updateOverbiteHorizontal.schema'


export default class UpdateOverbiteHorizontalController {
    constructor(
        private readonly updateOverbiteHorizontalApplication: UpdateOverbiteHorizontalApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateOverbiteHorizontalSchemaParamsType, unknown, updateOverbiteHorizontalSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                value: req.body.value
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateOverbiteHorizontalApplicationResult = await this.updateOverbiteHorizontalApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateOverbiteHorizontalApplicationResult.success,
                message: updateOverbiteHorizontalApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateOverbiteHorizontalApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateOverbiteHorizontalApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}