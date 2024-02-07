'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCollaboratorPayAppliation from '../../application/ReadCollaboratorPayments.application'

import { readCollaboratorPaymentsSchemaParamsType } from '../schemas/readCollaboratorPayments.schema'


export default class ReadCollaboratorPaymentController {
    constructor(
        private readonly readCollaboratorPayAppliation: ReadCollaboratorPayAppliation,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readCollaboratorPaymentsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                year: Number(req.params.year),
                idSmCollaborator: req.params.idCollaborator,
                idSmClinic: req.params.idClinic
            }
        }
        try {
            const readCollaboratorPayAppliationResult = await this.readCollaboratorPayAppliation.run(payload.body)
            req.apiResponse = {
                success: readCollaboratorPayAppliationResult.success,
                message: readCollaboratorPayAppliationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCollaboratorPayAppliationResult.success },
                language: { refresh: false },
                data: readCollaboratorPayAppliationResult.data
            }
            res.status(readCollaboratorPayAppliationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}