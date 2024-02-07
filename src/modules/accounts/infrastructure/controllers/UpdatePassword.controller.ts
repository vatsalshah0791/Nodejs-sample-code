'use strict'


import { Request, Response, NextFunction } from 'express'

import UpdatePasswordApplication from '../../application/UpdatePassword.application'

import { updatePasswordSchemaBodyType } from '../schemas/updatePassword.schema'


export default class UpdatePasswordController {
    constructor(
        private readonly updatePasswordApplication: UpdatePasswordApplication,
        private readonly errorHandler: Function
    ){}
    run = async (
        req: Request<unknown, unknown, updatePasswordSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: {
                newPassword: req.body.newPassword,
                currentPassword: req.body.currentPassword,
            }
        }
        try {
            const updatePasswordApplicationResult = await this.updatePasswordApplication.run({ ...payload.body, idAccount: payload.idAccount })
            req.apiResponse = {
                success: updatePasswordApplicationResult.success,
                message: updatePasswordApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePasswordApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updatePasswordApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}