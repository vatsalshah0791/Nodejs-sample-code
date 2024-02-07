'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateCollaboratorApplication from '../../application/CreateCollaborator.application'

import { createCollaboratorSchemaBodyType } from '../schemas/createCollaborator.schema'


export default class CreateCollaboratorController {
    constructor(
        private readonly createCollaboratorApplication: CreateCollaboratorApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createCollaboratorSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phonePrefix: req.body.phonePrefix,
                phone: req.body.phone,
                fullAddress: req.body.fullAddress,
                birthDate: req.body.birthDate,
                emergencyPhonePrefix: req.body.emergencyPhonePrefix,
                emergencyPhone: req.body.emergencyPhone,
                emergencyName: req.body.emergencyName,
                idAppGender: req.body.idGender,
                idAppCountry: req.body.idCountry,
                idAppRole: req.body.idRole,
                idAccount: req.idAccount
            }
        }
        try {
            const photo = req.file ? req.file.key : null
            const createCollaboratorApplicationResult = await this.createCollaboratorApplication.run({ ...payload.body, photo })
            req.apiResponse = {
                success: createCollaboratorApplicationResult.success,
                message: createCollaboratorApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createCollaboratorApplicationResult.success},
                language: { refresh: false },
                data: createCollaboratorApplicationResult.data
            }
            res.status(createCollaboratorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}