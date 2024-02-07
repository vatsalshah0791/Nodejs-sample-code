'use strict'


import { Request, Response } from 'express'

import LoginApplication from '../../application/Login.application'

import { loginSchemaBodyType } from '../schemas/login.schema'


export default class LoginController {
    constructor(
        private readonly loginApplication: LoginApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, loginSchemaBodyType>,
        res: Response
    ) => {
        const payload = {
            body: {
                username: req.body.username,
                password: req.body.password
            }
        }
        try {
            const { statusCode, ...loginApplicationResult } = await this.loginApplication.run(payload.body)
            req.apiResponse = loginApplicationResult
            return res.status(statusCode).json(req.apiResponse)
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}