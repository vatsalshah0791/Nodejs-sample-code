'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateSensitivityTestApplication from '../../application/UpdateSensitivityTest.application'

import { updateSensitivityTestSchemaBodyType, updateSensitivityTestSchemaParamsType } from '../schemas/updateSensitivityTest.schema'


export default class UpdateSensitivityTestController {
    constructor(
        private readonly updateSensitivityTestApplication: UpdateSensitivityTestApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateSensitivityTestSchemaParamsType, unknown, updateSensitivityTestSchemaBodyType>,
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
            const updateSensitivityTestApplicationResut = await this.updateSensitivityTestApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateSensitivityTestApplicationResut.success,
                message: updateSensitivityTestApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateSensitivityTestApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateSensitivityTestApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}