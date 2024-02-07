'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadLanguagesApplication from '../../application/ReadLanguages.application'


export default class ReadLanguagesController {
    constructor(
        private readonly readLanguagesApplication: ReadLanguagesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readLanguagesApplicationResult = await this.readLanguagesApplication.run()
            req.apiResponse = {
                success: readLanguagesApplicationResult.success,
                message: readLanguagesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readLanguagesApplicationResult.success },
                language: { refresh: false },
                data: readLanguagesApplicationResult.data
            }
            res.status(readLanguagesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}