'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateDoctorApplication from '../../application/CreateDoctor.application'

import { createDoctorSchemaBodyType } from '../schemas/createDoctor.schema'


export default class CreateDoctorController {
    constructor(
        private readonly createDoctorApplication: CreateDoctorApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createDoctorSchemaBodyType>,
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
                idAccount: req.idAccount
            }
        }
        try {
            const photo = req.file ? req.file.key : null
            const createDoctorApplicationResult = await this.createDoctorApplication.run({
                ...payload.body,
                photo,
                idAppRole: '3'
            })
            req.apiResponse = {
                success: createDoctorApplicationResult.success,
                message: createDoctorApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createDoctorApplicationResult.success },
                language: { refresh: false },
                data: createDoctorApplicationResult.data
            }
            res.status(createDoctorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}