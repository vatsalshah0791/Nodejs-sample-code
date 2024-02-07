'use strict'


import { Request, Response, NextFunction } from 'express'

import UpdateLanguageApplication from '../../application/UpdateLanguage.application'

import { updateLanguageSchemaSchemaBodyType } from '../schemas/updateLanguage.schema'


export default class UpdateLanguageController {
    constructor(
        private readonly updateLanguageApplication: UpdateLanguageApplication,
        private readonly errorHandler: Function
    ){}
    run = async (
        req: Request<unknown, unknown, updateLanguageSchemaSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: {
                idAppLanguage: req.body.idLanguage
            }
        }
        try {
            const updateLanguageApplicationResult = await this.updateLanguageApplication.run({ ...payload.body, idAccount: payload.idAccount })
            req.apiResponse = {
                success: updateLanguageApplicationResult.success,
                message: updateLanguageApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateLanguageApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateLanguageApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}