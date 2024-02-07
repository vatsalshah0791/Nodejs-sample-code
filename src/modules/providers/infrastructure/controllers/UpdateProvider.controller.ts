'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateProviderApplication from '../../application/UpdateProvider.application'

import { updateProviderSchemaBodyType, updateProviderSchemaParamsType } from '../schemas/updateProvider.schema'


export default class UpdateProviderController {
    constructor(
        private readonly updateProviderApplication: UpdateProviderApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateProviderSchemaParamsType, unknown, updateProviderSchemaBodyType>,
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
            },
            params: { id: req.params.id }
        }
        try {
            const updateProviderApplicationResult = await this.updateProviderApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateProviderApplicationResult.success,
                message: updateProviderApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateProviderApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateProviderApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}