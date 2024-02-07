'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadClinicsByAdminApplication from '../../application/ReadClinicsByAdmin.application'


export default class ReadClinicsByAdminController {
    constructor(
        private readonly readClinicsByAdminApplication: ReadClinicsByAdminApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const readClinicsByAdminApplicationResult = await this.readClinicsByAdminApplication.run(payload)
            req.apiResponse = {
                success: readClinicsByAdminApplicationResult.success,
                message: readClinicsByAdminApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readClinicsByAdminApplicationResult.success },
                language: { refresh: false },
                data: readClinicsByAdminApplicationResult.data
            }
            res.status(readClinicsByAdminApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}