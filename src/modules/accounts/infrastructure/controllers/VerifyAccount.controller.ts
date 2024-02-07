'use strict'


import { Request, Response, NextFunction } from 'express'

import VerifyAccountApplication from '../../application/VerifyAccount.application'

import { verifyAccountSchemaBodyType } from '../schemas/verifyAccount.schema'


export default class VerifyAccountController {
    constructor(
        private readonly verifyAccountApplication: VerifyAccountApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, verifyAccountSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                verificationCode: req.body.verificationCode,
                idAccount: req.idAccount
            }
        }
        try {
            const verifyAccountApplicationResult = await this.verifyAccountApplication.run(payload.body)
            req.apiResponse = {
                success: verifyAccountApplicationResult.success,
                message: verifyAccountApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(verifyAccountApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}