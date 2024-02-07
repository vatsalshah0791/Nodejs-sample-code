'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadGendersApplication from '../../application/ReadGenders.application'


export default class ReadGendersController {
    constructor(
        private readonly readGendersApplication: ReadGendersApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readGendersApplicationResult = await this.readGendersApplication.run()
            req.apiResponse = {
                success: readGendersApplicationResult.success,
                message: readGendersApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readGendersApplicationResult.data
            }
            res.status(readGendersApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}