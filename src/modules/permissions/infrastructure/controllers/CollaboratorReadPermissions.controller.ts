'use strict'


import { NextFunction, Request, Response } from 'express'

import CollaboratorReadPermissionsApplication from '../../application/CollaboratorReadPermissions.application'


export default class CollaboratorReadPermissionsController {
    constructor(
        private readonly collaboratorReadPermissionsApplication: CollaboratorReadPermissionsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const collaboratorReadPermissionsApplicationResult = await this.collaboratorReadPermissionsApplication.run(payload)
            req.apiResponse = {
                success: collaboratorReadPermissionsApplicationResult.success,
                message: collaboratorReadPermissionsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && collaboratorReadPermissionsApplicationResult.success },
                language: { refresh: false },
                data: collaboratorReadPermissionsApplicationResult.data
            }
            res.status(collaboratorReadPermissionsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}