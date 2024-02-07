'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateCollaboratorPayApplication from '../../application/CreateCollaboratorPay.application'

import { createCollaboratorPaySchemaBodyType, createCollaboratorPaySchemaParamsType } from '../schemas/createCollaboratorPay.schema'


export default class CreateCollaboratorPayController {
    constructor(
        private readonly createCollaboratorPayApplication: CreateCollaboratorPayApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<createCollaboratorPaySchemaParamsType, unknown, createCollaboratorPaySchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                salary: Number(req.body.salary),
                commission: Number(req.body.commission),
                month: Number(req.body.month),
                year: Number(req.body.year),
                idSmClinic: req.body.idClinic
            },
            params: { idSmCollaborator: req.params.idCollaborator }
        }
        try {
            const createCollaboratorPayApplicationResult = await this.createCollaboratorPayApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: createCollaboratorPayApplicationResult.success,
                message: createCollaboratorPayApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createCollaboratorPayApplicationResult.success },
                language: { refresh: false },
                data: createCollaboratorPayApplicationResult.data
            }
            res.status(createCollaboratorPayApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}