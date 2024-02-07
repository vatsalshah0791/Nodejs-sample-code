'use strict'


import { Request, Response, NextFunction } from 'express'

import UpdateUsernameApplication from '../../application/UpdateUsername.application'

import { updateUsernameSchemaBodyType } from '../schemas/updateUsername.schema'


export default class UpdateUsernameController {
    constructor(
        private readonly updateUsernameApplication: UpdateUsernameApplication,
        private readonly errorHandler: Function
    ){}
    run = async (
        req: Request<unknown, unknown, updateUsernameSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: {
                newUsername: req.body.newUsername
            }
        }
        try {
            const updateUsernameApplicationResult = await this.updateUsernameApplication.run({ ...payload.body, idAccount: payload.idAccount })
            req.apiResponse = {
                success: updateUsernameApplicationResult.success,
                message: updateUsernameApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateUsernameApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateUsernameApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}