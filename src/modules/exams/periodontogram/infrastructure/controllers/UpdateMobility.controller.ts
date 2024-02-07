'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateMobilityApplication from '../../application/UpdateMobility.application'

import { updateMobilitySchemaBodyType, updateMobilitySchemaParamsType } from '../schemas/updateMobility.schemas'


export default class UpdateMobilityController {
    constructor(
        private readonly updateMobilityApplication: UpdateMobilityApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateMobilitySchemaParamsType, unknown, updateMobilitySchemaBodyType>,
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
            const updateMobilityApplicationResut = await this.updateMobilityApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateMobilityApplicationResut.success,
                message: updateMobilityApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateMobilityApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateMobilityApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}