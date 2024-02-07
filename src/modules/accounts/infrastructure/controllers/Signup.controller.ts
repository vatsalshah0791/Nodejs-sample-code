'use strict'


import { Request, Response } from 'express'

import SignupApplication from '../../application/Signup.application'

import { signupSchemaBodyType } from '../schemas/signup.schema'

import verifyAccount from '../email/templates/verifyAccount'


export default class SignupController {
    constructor(
        private readonly signupApplication: SignupApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, signupSchemaBodyType>,
        res: Response
    ) => {
        const payload = {
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                companyName: req.body.companyName,
                idAppGender: req.body.idGender,
                idAppCountry: req.body.idCountry
            }
        }
        try {
            const { statusCode, ...signupApplicationResult } = await this.signupApplication.run(payload.body)
            if(signupApplicationResult.success) {
                await verifyAccount({
                    to: payload.body.email,
                    name: signupApplicationResult.data?.name as string,
                    idAccount: signupApplicationResult.data?.idAccount as string,
                    verificationCode: signupApplicationResult.data?.verificationCode as string
                })
            }
            delete signupApplicationResult.data?.verificationCode
            req.apiResponse = signupApplicationResult
            return res.status(statusCode).json(req.apiResponse)
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}