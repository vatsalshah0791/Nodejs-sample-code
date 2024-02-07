'use strict'


import { Request, Response } from 'express'

import RefreshTokenApplication from '../../application/RefreshToken.application'


export default class RefreshTokenController {
    constructor(private readonly refreshTokenApplication: RefreshTokenApplication) {}
    run = async (req: Request, res: Response) => {
        const payload = {
            idAccount: req.idAccount
        }
        try {
            if(req.method !== 'GET') {
                req.apiResponse.accessToken = { refresh: false }
            }
            if(req.apiResponse.accessToken.refresh) {
                const refreshTokenApplicationResult = await this.refreshTokenApplication.run(payload)
                if(refreshTokenApplicationResult.success) {
                    req.apiResponse.accessToken.accessToken = refreshTokenApplicationResult.data?.accessToken
                }
                else {
                    req.apiResponse.accessToken = { refresh: false }
                }
            }
            return res.json(req.apiResponse)
        } catch (error) {
            return res.json(req.apiResponse)
        }
    }
}