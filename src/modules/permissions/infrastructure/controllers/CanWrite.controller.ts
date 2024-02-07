'use strict'


import { NextFunction, Request, Response } from 'express'

import CanWriteApplication from '../../application/CanWrite.application'


export default class CanWriteController {
    constructor(
        private readonly canWriteApplication: CanWriteApplication,
        private readonly errorHandler: Function
    ) {}
    run = (data: { idSection: string }) => async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(req.idRole === '1') {
                return next()
            }
            const canWriteApplicationResult = await this.canWriteApplication.run({
                idAccount: req.idAccount,
                idSection: data.idSection
            })
            if(!canWriteApplicationResult.success) {
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