'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdatePatientApplication from '../../application/UpdatePatient.application'

import { updatePatientSchemaBodyType, updatePatientSchemaParamsType } from '../schemas/updatePatient.schema'


export default class UpdatePatientController {
    constructor(
        private readonly updatePatientApplication: UpdatePatientApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updatePatientSchemaParamsType, unknown, updatePatientSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phonePrefix: req.body.phonePrefix,
                phone: req.body.phone,
                fullAddress: req.body.fullAddress,
                workplace: req.body.workplace,
                recommendedBy: req.body.recommendedBy || null,
                birthDate: req.body.birthDate,
                emergencyPhonePrefix: req.body.emergencyPhonePrefix,
                emergencyPhone: req.body.emergencyPhone,
                emergencyName: req.body.emergencyName,
                idAppGender: req.body.idGender,
                idAppCountry: req.body.idCountry,
                idSmCollaborator: req.body.idDoctor
            }
        }
        const params = { id: req.params.id }
        try {
            const updatePatientApplicationResult = await this.updatePatientApplication.run({ ...payload.body, ...params })
            req.apiResponse = {
                success: updatePatientApplicationResult.success,
                message: updatePatientApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updatePatientApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updatePatientApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}