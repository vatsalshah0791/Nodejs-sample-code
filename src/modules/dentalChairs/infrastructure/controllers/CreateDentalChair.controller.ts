'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateDentalChairApplication from '../../application/CreateDentalChair.application'

import { createDentalChairSchemaBodyType } from '../schemas/createDentalChair.schema'


export default class CreateDentalChairController {
    constructor(
        private readonly createDentalChairApplication: CreateDentalChairApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createDentalChairSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                chairName: req.body.chairName,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createDentalChairApplicationResult = await this.createDentalChairApplication.run(payload.body)
            req.apiResponse = {
                success: createDentalChairApplicationResult.success,
                message: createDentalChairApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createDentalChairApplicationResult.success },
                language: { refresh: false },
                data: createDentalChairApplicationResult.data
            }
            res.status(createDentalChairApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}