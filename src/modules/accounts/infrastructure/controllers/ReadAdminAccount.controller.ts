'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadAdminAccountApplication from '../../application/ReadAdminAccount.application'


export default class ReadAdminAccountController {
    constructor(
        private readonly readAdminAccountApplication: ReadAdminAccountApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idAccount: req.idAccount
        }
        try {
            const readAdminAccountApplicationResult = await this.readAdminAccountApplication.run(payload)
            req.apiResponse = {
                success: readAdminAccountApplicationResult.success,
                message: readAdminAccountApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readAdminAccountApplicationResult.success },
                language: readAdminAccountApplicationResult.language,
                data: readAdminAccountApplicationResult.data
            }
            res.status(readAdminAccountApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}