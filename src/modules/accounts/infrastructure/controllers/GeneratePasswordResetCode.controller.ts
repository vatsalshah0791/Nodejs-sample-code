'use strict'


import { NextFunction, Request, Response } from 'express'

import GeneratePasswordResetCodeApplication from '../../application/GeneratePasswordResetCode.application'

import { generatePasswordResetCodeSchemaBodyType } from '../schemas/generatePasswordResetCode.schemas'

import passwordResetCode from '../email/templates/passwordResetCode'


export default class GeneratePasswordResetCodeController {
    constructor(
        private readonly generatePasswordResetCodeApplication: GeneratePasswordResetCodeApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, generatePasswordResetCodeSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                username: req.body.username
            }
        }
        try {
            const generatePasswordResetCodeResult = await this.generatePasswordResetCodeApplication.run(payload.body)
            if(generatePasswordResetCodeResult.success) {
                await passwordResetCode({
                    to: generatePasswordResetCodeResult.data?.email as string,
                    idAccount: generatePasswordResetCodeResult.data?.idAccount as string,
                    code: generatePasswordResetCodeResult.data?.code as string
                })
            }
            req.apiResponse = {
                success: generatePasswordResetCodeResult.success,
                message: generatePasswordResetCodeResult.message,
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(generatePasswordResetCodeResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}