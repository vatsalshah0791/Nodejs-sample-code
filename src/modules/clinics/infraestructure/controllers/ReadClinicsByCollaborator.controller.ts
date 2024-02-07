'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadClinicsByCollaboratorApplication from '../../application/ReadClinicsByCollaborator.application'


export default class ReadClinicsByCollaboratorController {
    constructor(
        private readonly readClinicsByCollaboratorApplication: ReadClinicsByCollaboratorApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const readClinicsByCollaboratorApplicationResult = await this.readClinicsByCollaboratorApplication.run(payload)
            req.apiResponse = {
                success: readClinicsByCollaboratorApplicationResult.success,
                message: readClinicsByCollaboratorApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readClinicsByCollaboratorApplicationResult.success },
                language: { refresh: false },
                data: readClinicsByCollaboratorApplicationResult.data
            }
            res.status(readClinicsByCollaboratorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}