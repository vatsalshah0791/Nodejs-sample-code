'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCollaboratorsApplication from '../../application/ReadCollaborators.application'


export default class ReadCollaboratorsController {
    constructor(
        private readonly readCollaboratorsApplication: ReadCollaboratorsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const readCollaboratorsResult = await this.readCollaboratorsApplication.run({ selectIdAppRole: [4, 5, 6, 7], ...payload })
            req.apiResponse = {
                success: readCollaboratorsResult.success,
                message: readCollaboratorsResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCollaboratorsResult.success },
                language: { refresh: false },
                data: readCollaboratorsResult.data
            }
            res.status(readCollaboratorsResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}