'use strict'


import { NextFunction, Request, Response } from 'express'

import AssignClinicApplication from '../../application/AssignClinic.application'

import { assignClinicSchemaParamsType, assignClinicSchemaBodyType } from '../schemas/assignClinic.schemats'


export default class AssignClinicController {
    constructor(
        private readonly assignClinicApplication: AssignClinicApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<assignClinicSchemaParamsType, unknown, assignClinicSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                salary: Number(req.body.salary),
                commission: Number(req.body.commission),
                idClinic: req.body.idClinic
            },
            params: { idCollaborator: req.params.idCollaborator }
        }
        try {
            const assignClinicApplicationResult = await this.assignClinicApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: assignClinicApplicationResult.success,
                message: assignClinicApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && assignClinicApplicationResult.success },
                language: { refresh: false },
                data: assignClinicApplicationResult.data
            }
            res.status(assignClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}