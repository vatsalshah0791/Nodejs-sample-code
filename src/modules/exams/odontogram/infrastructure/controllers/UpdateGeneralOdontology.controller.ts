'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateGeneralOdontologyApplication from '../../application/UpdateGeneralOdontology.application'

import { updateGeneralOdontologySchemaBodyType, updateGeneralOdontologySchemaParamsType } from '../schemas/updateGeneralOdontology.schema'


export default class UpdateGeneralOdontologyController {
    constructor(
        private readonly updateGeneralOdontologyApplication: UpdateGeneralOdontologyApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateGeneralOdontologySchemaParamsType, unknown, updateGeneralOdontologySchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                title: req.body.title,
                value: req.body.value
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateGeneralOdontologyApplicationResut = await this.updateGeneralOdontologyApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateGeneralOdontologyApplicationResut.success,
                message: updateGeneralOdontologyApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateGeneralOdontologyApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateGeneralOdontologyApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}