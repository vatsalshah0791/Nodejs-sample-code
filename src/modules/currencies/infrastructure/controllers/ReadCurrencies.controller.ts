'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCurrenciesApplication from '../../application/ReadCurrencies.application'


export default class ReadCurrenciesController {
    constructor(
        private readonly readCurrenciesApplication: ReadCurrenciesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readCurrenciesApplicationResult = await this.readCurrenciesApplication.run()
            req.apiResponse = {
                success: readCurrenciesApplicationResult.success,
                message: readCurrenciesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCurrenciesApplicationResult.success },
                language: { refresh: false },
                data: readCurrenciesApplicationResult.data
            }
            res.status(readCurrenciesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}