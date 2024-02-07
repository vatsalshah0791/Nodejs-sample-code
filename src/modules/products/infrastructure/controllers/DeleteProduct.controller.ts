'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteProductApplication from '../../application/DeleteProduct.application'

import { deleteProductSchemaParamsType } from '../schemas/deleteProduc.schema'


export default class DeleteProductController {
    constructor(
        private readonly deleteProductApplication: DeleteProductApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deleteProductSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const deleteProductApplicationResult = await this.deleteProductApplication.run(payload.params)
            req.apiResponse = {
                success: deleteProductApplicationResult.success,
                message: deleteProductApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteProductApplicationResult.success },
                language: { refresh: false }
            }
            res.status(deleteProductApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}