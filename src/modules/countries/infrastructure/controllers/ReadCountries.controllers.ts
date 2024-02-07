'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCountriesApplication from '../../application/ReadCountries.application'


export default class ReadCountriesController {
    constructor(
        private readonly readCountriesApplication: ReadCountriesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readCountriesApplicationResult = await this.readCountriesApplication.run()
            req.apiResponse = {
                success: readCountriesApplicationResult.success,
                message: readCountriesApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readCountriesApplicationResult.data
            }
            res.status(readCountriesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}