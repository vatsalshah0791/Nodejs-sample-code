'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateAtmApplication from '../../application/UpdateAtm.application'

import { updateAtmSchemaBodyType, updateAtmSchemaParamsType } from '../schema/updateAtm.schema'


export default class UpdateAtmController {
    constructor(
        private readonly updateAtmApplication: UpdateAtmApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateAtmSchemaParamsType, unknown, updateAtmSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                value: req.body.value
            },
            params: {
                id: req.params.id,
                key: req.params.key
            }
        }
        try {
            const updateAtmApplicationResult = await this.updateAtmApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateAtmApplicationResult.success,
                message: updateAtmApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateAtmApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateAtmApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}