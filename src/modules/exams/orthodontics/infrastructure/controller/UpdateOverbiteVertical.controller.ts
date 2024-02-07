'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateOverbiteVerticalApplication from '../../application/UpdateOverbiteVertical.application'

import { updateOverbiteVerticalSchemaBodyType, updateOverbiteVerticalSchemaParamsType } from '../schema/updateOverbiteVertical.schema'


export default class UpdateOverbiteVerticalController {
    constructor(
        private readonly updateOverbiteVerticalApplication: UpdateOverbiteVerticalApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateOverbiteVerticalSchemaParamsType, unknown, updateOverbiteVerticalSchemaBodyType>,
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
            const updateOverbiteVerticalApplicationResult = await this.updateOverbiteVerticalApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateOverbiteVerticalApplicationResult.success,
                message: updateOverbiteVerticalApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateOverbiteVerticalApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateOverbiteVerticalApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}