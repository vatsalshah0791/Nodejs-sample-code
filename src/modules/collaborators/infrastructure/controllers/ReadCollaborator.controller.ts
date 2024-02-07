'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCollaboratorApplication from '../../application/ReadCollaborator.application'

import { readCollaboratorSchemaParamsType } from '../schemas/readCollaborator.schema'


export default class ReadCollaboratorController {
    constructor(
        private readonly readCollaboratorApplication: ReadCollaboratorApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readCollaboratorSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const readCollaboratorResult = await this.readCollaboratorApplication.run(payload.params)
            req.apiResponse = {
                success: readCollaboratorResult.success,
                message: readCollaboratorResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCollaboratorResult.success },
                language: { refresh: false },
                data: readCollaboratorResult.data
            }
            res.status(readCollaboratorResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}