'use strict'


import { NextFunction, Request, Response } from 'express'

import VerifyPlanExpirationDateAdminApplication from '../../application/VerifyPlanExpirationDateAdmin.application'


export default class VerifyPlanExpirationDateAdminController {
    constructor(
        private readonly verifyPlanExpirationDateAdminApplication: VerifyPlanExpirationDateAdminApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const verifyPlanExpirationDateAdminApplicationResult = await this.verifyPlanExpirationDateAdminApplication.run(payload)
            req.apiResponse = {
                success: verifyPlanExpirationDateAdminApplicationResult.success,
                message: verifyPlanExpirationDateAdminApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && verifyPlanExpirationDateAdminApplicationResult.success },
                language: { refresh: false }
            }
            res.status(verifyPlanExpirationDateAdminApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}