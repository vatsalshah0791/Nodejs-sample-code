'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCollaboratorsUnassignedApplication from '../../application/ReadCollaboratorsUnassigned.application'

import { readCollaboratorsUnassignedSchemaParamsType } from '../schemas/readCollaboratorsUnassigned.schema'


export default class ReadDoctorsUnassignedController {
    constructor(
        private readonly readCollaboratorsUnassignedApplication: ReadCollaboratorsUnassignedApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readCollaboratorsUnassignedSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idClinic: req.params.idClinic }
        }
        try {
            const readCollaboratorsUnassignedApplicationResult = await this.readCollaboratorsUnassignedApplication.run({ ...payload.params, selectIdAppRole: [3] })
            req.apiResponse = {
                success: readCollaboratorsUnassignedApplicationResult.success,
                message: readCollaboratorsUnassignedApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readCollaboratorsUnassignedApplicationResult.success },
                language: { refresh: false },
                data: readCollaboratorsUnassignedApplicationResult.data
            }
            res.status(readCollaboratorsUnassignedApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}