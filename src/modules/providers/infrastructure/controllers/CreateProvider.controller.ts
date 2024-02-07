'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateProviderApplication from '../../application/CreateProvider.application'

import { createProviderSchemaBodyType } from '../schemas/createProvider.schema'


export default class CreateProviderController {
    constructor(
        private readonly createProviderApplication: CreateProviderApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createProviderSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                title: req.body.title,
                email: req.body.email,
                fullAddress: req.body.fullAddress,
                phonePrefix: req.body.phonePrefix,
                phone: req.body.phone,
                website: req.body.website,
                idAppProviderType: req.body.idProviderType,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createProviderApplicationResult = await this.createProviderApplication.run(payload.body)
            req.apiResponse = {
                success: createProviderApplicationResult.success,
                message: createProviderApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createProviderApplicationResult.success },
                language: { refresh: false },
                data: createProviderApplicationResult.data
            }
            res.status(createProviderApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}