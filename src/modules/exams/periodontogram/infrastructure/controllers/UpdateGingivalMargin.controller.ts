'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateGingivalMarginApplication from '../../application/UpdateGingivalMargin.application'

import { updateGingivalMarginSchemaBodyType, updateGingivalMarginSchemaParamsType } from '../schemas/updateGingivalMargin.schemas'


export default class UpdateGingivalMarginController {
    constructor(
        private readonly updateGingivalMarginApplication: UpdateGingivalMarginApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateGingivalMarginSchemaParamsType, unknown, updateGingivalMarginSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                mesial: req.body.mesial,
                central: req.body.central,
                distal: req.body.distal
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateGingivalMarginApplicationResut = await this.updateGingivalMarginApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateGingivalMarginApplicationResut.success,
                message: updateGingivalMarginApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateGingivalMarginApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateGingivalMarginApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}