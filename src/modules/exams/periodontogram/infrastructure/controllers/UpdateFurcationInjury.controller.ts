'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateFurcationInjuryApplication from '../../application/UpdateFurcationInjury.application'

import { updateFurcationInjurySchemaBodyType, updateFurcationInjurySchemaParamsType } from '../schemas/updateFurcationInjury.schema'


export default class UpdateFurcationInjuryController {
    constructor(
        private readonly updateFurcationInjuryApplication: UpdateFurcationInjuryApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateFurcationInjurySchemaParamsType, unknown, updateFurcationInjurySchemaBodyType>,
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
            const updateFurcationInjuryApplicationResut = await this.updateFurcationInjuryApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateFurcationInjuryApplicationResut.success,
                message: updateFurcationInjuryApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateFurcationInjuryApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateFurcationInjuryApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}