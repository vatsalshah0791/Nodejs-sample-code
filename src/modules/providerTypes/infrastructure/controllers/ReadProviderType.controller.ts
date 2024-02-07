'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadProviderTypeApplication from '../../application/ReadProviderType.application'


export default class ReadProviderTypeController {
    constructor(
        private readonly readProviderTypeApplication: ReadProviderTypeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readProviderTypeApplicationResult = await this.readProviderTypeApplication.run()
            req.apiResponse = {
                success: readProviderTypeApplicationResult.success,
                message: readProviderTypeApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readProviderTypeApplicationResult.data
            }
            res.status(readProviderTypeApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}