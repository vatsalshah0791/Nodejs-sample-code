'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadRolesCollaboratorsApplication from '../../application/ReadRolesCollaborators.application'


export default class ReadRolesCollaboratorsController {
    constructor(
        private readonly readRolesCollaboratorsApplication: ReadRolesCollaboratorsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readRolesCollaboratorsApplicationResult = await this.readRolesCollaboratorsApplication.run()
            req.apiResponse = {
                success: readRolesCollaboratorsApplicationResult.success,
                message: readRolesCollaboratorsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readRolesCollaboratorsApplicationResult.success },
                language: { refresh: false },
                data: readRolesCollaboratorsApplicationResult.data
            }
            res.status(readRolesCollaboratorsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, res)
        }
    }
}