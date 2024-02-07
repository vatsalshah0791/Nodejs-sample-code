'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdatePermissionApplication from '../../application/UpdatePermission.application'

import { updatePermissionSchemaBodyType } from '../schemas/updatePermission.schema'


export default class UpdatePermissionController {
    constructor(
        private readonly updatePermissionApplication: UpdatePermissionApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, updatePermissionSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                canRead: req.body.canRead,
                canWrite: req.body.canWrite,
                idSmCollaborator: req.body.idSmCollaborator,
                idAppSection: req.body.idAppSection
            }
        }
        try {
            const updatePermissionApplicationResult = await this.updatePermissionApplication.run(payload.body)
            req.apiResponse = {
                success: updatePermissionApplicationResult.success,
                message: updatePermissionApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePermissionApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updatePermissionApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}