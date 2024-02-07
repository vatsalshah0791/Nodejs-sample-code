'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateRecordApplication from '../../application/UpdateRecord.application'

import { updateRecordSchemaBodyType, updateRecordSchemaParamsType } from '../schemas/updateRecord'


export default class UpdateRecordController {
    constructor(
        private readonly updateRecordApplication: UpdateRecordApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateRecordSchemaParamsType, unknown, updateRecordSchemaBodyType>,
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
            const updateRecordApplicationResult = await this.updateRecordApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateRecordApplicationResult.success,
                message: updateRecordApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateRecordApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateRecordApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}