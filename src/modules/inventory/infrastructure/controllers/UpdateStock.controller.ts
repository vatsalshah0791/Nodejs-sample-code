'use strict'

import { NextFunction, Request, Response } from 'express'

import UpdateStockApplication from '../../application/UpdateStock.application'

import {
    updateStockSchemaBodyType,
    updateStockSchemaParamsType
} from '../schemas/updateStock.schema'

export default class UpdateStockController {
    constructor(
        private readonly updateStockApplication: UpdateStockApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateStockSchemaParamsType, unknown, updateStockSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const params = { id: req.params.idStock }
        const body = { subtrahend: req.body.subtrahend }
        try {
            const updateStockApplicationResult = await this.updateStockApplication.run({
                ...params,
                ...body
            })
            req.apiResponse = {
                success: updateStockApplicationResult.success,
                message: updateStockApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateStockApplicationResult.success},
                language: updateStockApplicationResult.language
            }
            res.status(updateStockApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}