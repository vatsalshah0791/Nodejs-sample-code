'use strict'


import { NextFunction, Request, Response } from 'express'

import CreatePatientApplication from '../../application/CreatePatient.application'

import { createPatientSchemaBodyType } from '../schemas/createPatient.schema'


export default class CreatePatientController {
    constructor(
        private readonly createPatientApplication: CreatePatientApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createPatientSchemaBodyType>,
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
                workplace: req.body.workplace,
                recommendedBy: req.body.recommendedBy || null,
                birthDate: req.body.birthDate,
                emergencyPhonePrefix: req.body.emergencyPhonePrefix,
                emergencyPhone: req.body.emergencyPhone,
                emergencyName: req.body.emergencyName,
                idAppGender: req.body.idGender,
                idAppCountry: req.body.idCountry,
                idSmCollaborator: req.body.idDoctor,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const photo = req.file ? req.file.key : null
            const createPatientApplicationResult = await this.createPatientApplication.run({ ...payload.body, photo })
            req.apiResponse = {
                success: createPatientApplicationResult.success,
                message: createPatientApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createPatientApplicationResult.success},
                language: { refresh: false },
                data: createPatientApplicationResult.data
            }
            res.status(createPatientApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}