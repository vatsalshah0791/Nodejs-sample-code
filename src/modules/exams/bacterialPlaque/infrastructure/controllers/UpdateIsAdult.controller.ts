'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateIsAdultApplication from '../../application/UpdateIsAdult.application'

import { updateIsAdultSchemaBodyType, updateIsAdultSchemaParamsType } from '../schemas/updateIsAdult.schema'


export default class UpdateIsAdultController {
    constructor(
        private readonly updateIsAdultApplication: UpdateIsAdultApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateIsAdultSchemaParamsType, unknown, updateIsAdultSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                isAdult: req.body.isAdult
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateIsAdultApplicationResult = await this.updateIsAdultApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateIsAdultApplicationResult.success,
                message: updateIsAdultApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateIsAdultApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateIsAdultApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}