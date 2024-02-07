'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdatePeriodontalPocketApplication from '../../application/UpdatePeriodontalPocket.application'

import { updatePeriodontalPocketSchemaBodyType, updatePeriodontalPocketSchemaParamsType } from '../schemas/updatePeriodontalPocket.schemas'


export default class UpdatePeriodontalPocketController {
    constructor(
        private readonly updatePeriodontalPocketApplication: UpdatePeriodontalPocketApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updatePeriodontalPocketSchemaParamsType, unknown, updatePeriodontalPocketSchemaBodyType>,
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
            const updatePeriodontalPocketApplicationResut = await this.updatePeriodontalPocketApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updatePeriodontalPocketApplicationResut.success,
                message: updatePeriodontalPocketApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePeriodontalPocketApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updatePeriodontalPocketApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}