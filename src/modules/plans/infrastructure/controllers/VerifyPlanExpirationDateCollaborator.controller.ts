'use strict'


import { NextFunction, Request, Response } from 'express'

import VerifyPlanExpirationDateCollaboratorApplication from '../../application/VerifyPlanExpirationDateCollaborator.application'


export default class VerifyPlanExpirationDateCollaboratorController {
    constructor(
        private readonly verifyPlanExpirationDateCollaboratorApplication: VerifyPlanExpirationDateCollaboratorApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const verifyPlanExpirationDateCollaboratorApplicationResult = await this.verifyPlanExpirationDateCollaboratorApplication.run(payload)
            req.apiResponse = {
                success: verifyPlanExpirationDateCollaboratorApplicationResult.success,
                message: verifyPlanExpirationDateCollaboratorApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && verifyPlanExpirationDateCollaboratorApplicationResult.success },
                language: { refresh: false }
            }
            res.status(verifyPlanExpirationDateCollaboratorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}