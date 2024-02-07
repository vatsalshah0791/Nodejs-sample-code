'use strict'


import { NextFunction, Request, Response } from 'express'

import ResetVerificationCodeApplication from '../../application/ResetVerificationCode.application'

import verifyAccount from '../email/templates/verifyAccount'


export default class ResetVerificationCodeController {
    constructor(
        private readonly resetVerificationCodeApplication: ResetVerificationCodeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idAccount: req.idAccount
        }
        try {
            const resetVerificationCodeApplicationResult = await this.resetVerificationCodeApplication.run(payload)
            if(resetVerificationCodeApplicationResult.success) {
                await verifyAccount({
                    to: resetVerificationCodeApplicationResult.data?.email as string,
                    name: resetVerificationCodeApplicationResult.data?.name as string,
                    idAccount: payload.idAccount as string,
                    verificationCode: resetVerificationCodeApplicationResult.data?.verificationCode as string
                })
            }
            req.apiResponse = {
                success: resetVerificationCodeApplicationResult.success,
                message: resetVerificationCodeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(resetVerificationCodeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}