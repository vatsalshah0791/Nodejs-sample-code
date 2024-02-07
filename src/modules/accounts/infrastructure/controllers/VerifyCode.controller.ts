'use strict'


import { Request, Response, NextFunction } from 'express'

import VerifyCodeApplication from '../../application/VerifyCode.application'

import { verifyCodeSchemaBodyType } from '../schemas/verifyCode.schema'


export default class VerifyCodeController {
    constructor(
        private readonly verifyCodeApplication: VerifyCodeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, verifyCodeSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idAccount: req.body.idAccount,
                code: req.body.code
            }
        }
        try {
            const verifyCodeApplicationResult = await this.verifyCodeApplication.run(payload.body)
            req.apiResponse = {
                success: verifyCodeApplicationResult.success,
                message: verifyCodeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(verifyCodeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}