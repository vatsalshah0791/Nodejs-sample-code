'use strict'


import { NextFunction, Request, Response } from 'express'

import CanReadApplication from '../../application/CanRead.application'


export default class CanReadController {
    constructor(
        private readonly canReadApplication: CanReadApplication,
        private readonly errorHandler: Function
    ) {}
    run = (data: { idSection: string }) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(req.idRole === '1') {
                return next()
            }
            const canReadApplicationResult = await this.canReadApplication.run({
                idAccount: req.idAccount,
                idSection: data.idSection
            })
            if(!canReadApplicationResult.success) {
                req.apiResponse = {
                    success: false,
                    message: `Forbidden, you don't have permission to continue`,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                return res.status(403).json(req.apiResponse)
            }
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}