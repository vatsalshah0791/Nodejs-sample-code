'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteProviderApplication from '../../application/DeleteProvider.application'

import { deleteProviderSchemaParamsType } from '../schemas/deleteProvider.schema'


export default class DeleteProviderController {
    constructor(
        private readonly deleteProviderApplication: DeleteProviderApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deleteProviderSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const deleteProviderApplicationRestul = await this.deleteProviderApplication.run(payload.params)
            req.apiResponse = {
                success: deleteProviderApplicationRestul.success,
                message: deleteProviderApplicationRestul.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteProviderApplicationRestul.success },
                language: { refresh: false }
            }
            res.status(deleteProviderApplicationRestul.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}