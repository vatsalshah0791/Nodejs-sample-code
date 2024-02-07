'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadRolesAllApplication from '../../application/ReadRolesAll.application'


export default class ReadRolesAllController {
    constructor(
        private readonly readRolesAllApplication: ReadRolesAllApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readRolesAllApplicationResult = await this.readRolesAllApplication.run()
            req.apiResponse = {
                success: readRolesAllApplicationResult.success,
                message: readRolesAllApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readRolesAllApplicationResult.success },
                language: { refresh: false },
                data: readRolesAllApplicationResult.data
            }
            res.status(readRolesAllApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}