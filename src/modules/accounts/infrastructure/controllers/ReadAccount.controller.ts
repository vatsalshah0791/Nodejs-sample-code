'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadAccountApplication from '../../application/ReadAccount.application'


export default class ReadAccountController {
    constructor(
        private readonly readAccountApplication: ReadAccountApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idAccount: req.idAccount
        }
        try {
            const readAccountApplicationResult = await this.readAccountApplication.run(payload)
            req.apiResponse = {
                success: readAccountApplicationResult.success,
                message: readAccountApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readAccountApplicationResult.success },
                language: readAccountApplicationResult.language,
                data: readAccountApplicationResult.data
            }
            res.status(readAccountApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}