'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateDentalChairApplication from '../../application/UpdateDentalChair.application'

import { updateDentalChairSchemaBodyType, updateDentalChairSchemaParamsType } from '../schemas/updateDentalChair.schema'


export default class UpdateDentalChairController {
    constructor(
        private readonly updateDentalChairApplication: UpdateDentalChairApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateDentalChairSchemaParamsType, unknown, updateDentalChairSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                chairName: req.body.chairName,
                isAvailable: req.body.isAvailable
            },
            params: { id: req.params.id }
        }
        try {
            const updateDentalChairApplicationResult = await this.updateDentalChairApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateDentalChairApplicationResult.success,
                message: updateDentalChairApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateDentalChairApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateDentalChairApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}