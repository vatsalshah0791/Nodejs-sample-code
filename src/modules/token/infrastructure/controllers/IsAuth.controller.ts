'use strict'


import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

import IsAuthApplication from '../../application/IsAuth.application'

import { verifyAccessToken } from '../shared.import'


export default class IsAuthController {
    constructor(
        private readonly isAuthApplication: IsAuthApplication,
        private readonly errorHandler: Function
    ) {}
    run = (data: { allAccounts: boolean } = { allAccounts: false }) => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const token: string = req.get('Authorization')?.split(' ').pop() as string
            const decodedToken: JwtPayload = verifyAccessToken(token)
            const isAuthApplicationResult = await this.isAuthApplication.run({
                accessToken: token,
                accessTokenExp: decodedToken.exp as number,
                idAccount: decodedToken.idAccount,
                allAccounts: data.allAccounts
            })
            if(!isAuthApplicationResult.success) {
                req.apiResponse = {
                    success: isAuthApplicationResult.success,
                    message: 'Without authorization',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                return res.status(isAuthApplicationResult.statusCode).json(req.apiResponse)
            }
            req.idRole = isAuthApplicationResult.data?.idRole as string,
            req.idAccount = isAuthApplicationResult.data?.idAccount as string
            req.accessTokenNeedRefresh = isAuthApplicationResult.accessTokenNeedRefresh
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}