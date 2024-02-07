'use strict'


import { Request, Response, NextFunction } from 'express'

import ResetPasswordApplication from '../../application/ResetPassword.application'

import { resetPasswordSchemaBodyType } from '../schemas/resetPassword.schema'


export default class ResetPasswordController {
    constructor(
        private readonly resetPasswordApplication: ResetPasswordApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, resetPasswordSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idAccount: req.body.idAccount,
                code: req.body.code,
                newPassword: req.body.newPassword
            }
        }
        try {
            const resetPasswordApplicationResult = await this.resetPasswordApplication.run(payload.body)
            req.apiResponse = {
                success: resetPasswordApplicationResult.success,
                message: resetPasswordApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(resetPasswordApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}