'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCollaboratorAccountApplication from '../../application/ReadCollaboratorAccount.application'


export default class ReadCollaboratorAccountController {
    constructor(
        private readonly readCollaboratorAccountApplication: ReadCollaboratorAccountApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = {
            idAccount: req.idAccount
        }
        try {
            const readCollaboratorAccountApplicationResult = await this.readCollaboratorAccountApplication.run(payload)
            req.apiResponse = {
                success: readCollaboratorAccountApplicationResult.success,
                message: readCollaboratorAccountApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCollaboratorAccountApplicationResult.success },
                language: readCollaboratorAccountApplicationResult.language,
                data: readCollaboratorAccountApplicationResult.data
            }
            res.status(readCollaboratorAccountApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}