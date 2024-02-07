'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadProductsApplication from '../../application/ReadProducts.application'

import { readProductsSchemaParamsType } from '../schemas/readProducts.schema'


export default class ReadProductsController {
    constructor(
        private readonly readProductsApplication: ReadProductsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readProductsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idClinic: req.params.idClinic }
        }
        try {
            const readProductsApplicationResult = await this.readProductsApplication.run(payload.params)
            req.apiResponse = {
                success: readProductsApplicationResult.success,
                message: readProductsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readProductsApplicationResult.success },
                language: { refresh: false },
                data: readProductsApplicationResult.data
            }
            res.status(readProductsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}