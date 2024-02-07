'use strict'

import { NextFunction, Request, Response } from 'express'

import UpdateStatusApplication from '../../application/UpdateStatusAppointment.application'

import {
    updateStatuSchemaBodyType,
    updateStatuSchemaParamsType
} from '../schemas/updateStatus.schema'

export default class UpdateStatusController {
    constructor(
        private readonly updateStatusApplication: UpdateStatusApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateStatuSchemaParamsType, unknown, updateStatuSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const body = { status: req.body.status }
        const params = { id: req.params.id }
        try {
            const updateStatusApplicationResult = await this.updateStatusApplication.run({
                ...body,
                ...params
            })
            req.apiResponse = {
                success: updateStatusApplicationResult.success,
                message: updateStatusApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateStatusApplicationResult.success},
                language: updateStatusApplicationResult.language
            }
            res.status(updateStatusApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}