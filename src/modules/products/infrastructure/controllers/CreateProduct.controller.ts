'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateProductApplication from '../../application/CreateProduct.application'

import { createProducSchemaBodyType } from '../schemas/createProduct.schema'


export default class CreateProductController {
    constructor(
        private readonly createProductApplication: CreateProductApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createProducSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                productName: req.body.productName,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createProductApplicationResult = await this.createProductApplication.run(payload.body)
            req.apiResponse = {
                success: createProductApplicationResult.success,
                message: createProductApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createProductApplicationResult.success },
                language: { refresh: false },
                data: createProductApplicationResult.data
            }
            res.status(createProductApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}