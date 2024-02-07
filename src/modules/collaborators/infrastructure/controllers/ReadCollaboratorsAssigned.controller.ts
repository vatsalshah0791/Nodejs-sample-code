'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCollaboratorAssignedApplication from '../../application/ReadCollaboratorsAssigned.application'

import { readCollaboratorsAssignedSchemaParamsType } from '../schemas/readCollaboratorsAssigned.schema'


export default class ReadCollaboratorsAssignedController {
    constructor(
        private readonly readCollaboratorAssignedApplication: ReadCollaboratorAssignedApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readCollaboratorsAssignedSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idClinic: req.params.idClinic }
        }
        try {
            const readCollaboratorsAssignedApplicationResult = await this.readCollaboratorAssignedApplication.run({ ...payload.params, selectIdAppRole: [4, 5, 6, 7] })
            req.apiResponse = {
                success: readCollaboratorsAssignedApplicationResult.success,
                message: readCollaboratorsAssignedApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCollaboratorsAssignedApplicationResult.success },
                language: { refresh: false },
                data: readCollaboratorsAssignedApplicationResult.data
            }
            res.status(readCollaboratorsAssignedApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}