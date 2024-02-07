'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateProductApplication from '../../application/UpdateProduct.application'

import { updateProductSchemaBodyType, updateProductSchemaParamsType } from '../schemas/updateProduct.schema'


export default class UpdateProductController {
    constructor(
        private readonly updateProductApplication: UpdateProductApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateProductSchemaParamsType, unknown, updateProductSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: { productName: req.body.productName },
            params: { id: req.params.id }
        }
        try {
            const updateProductApplicationResult = await this.updateProductApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateProductApplicationResult.success,
                message: updateProductApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateProductApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateProductApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}