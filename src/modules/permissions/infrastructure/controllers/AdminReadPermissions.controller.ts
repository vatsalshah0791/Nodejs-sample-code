'use strict'


import { NextFunction, Request, Response } from 'express'

import AdminReadPermissionsApplication from '../../application/AdminReadPermissions.application'

import { adminReadPermissionsSchemaParamsType } from '../schemas/adminReadPermissions.schema'


export default class AdminReadPermissionsController {
    constructor(
        private readonly adminReadPermissionsApplication: AdminReadPermissionsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<adminReadPermissionsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: { id: req.params.id }
        }
        try {
            const adminReadPermissionsApplicationResult = await this.adminReadPermissionsApplication.run(payload.body)
            req.apiResponse = {
                success: adminReadPermissionsApplicationResult.success,
                message: adminReadPermissionsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && adminReadPermissionsApplicationResult.success },
                language: { refresh: false },
                data: adminReadPermissionsApplicationResult.data
            }
            res.status(adminReadPermissionsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}