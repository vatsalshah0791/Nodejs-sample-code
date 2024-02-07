'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateClinicApplication from '../../application/CreateClinic.application'

import { createClinicSchemaBodyType } from '../schemas/createClinic.schema'


export default class CreateClinicController {
    constructor(
        private readonly createClinicApplication: CreateClinicApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createClinicSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: {
                clinicName: req.body.clinicName,
                email: req.body.email,
                phonePrefix: req.body.phonePrefix,
                phone: req.body.phone,
                fullAddress: req.body.fullAddress,
                logo: req.file ? req.file.key : null,
                idAppCountry: req.body.idCountry,
                idAppTimeZone: req.body.idTimeZone,
                idAppCurrency: req.body.idCurrency,
            }

        }
        try {
            const createClinicApplicationResult = await this.createClinicApplication.run({...payload.body, idAccount: payload.idAccount })
            req.apiResponse = {
                success: createClinicApplicationResult.success,
                message: createClinicApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createClinicApplicationResult.success },
                language: { refresh: false },
                data: createClinicApplicationResult.data
            }
            res.status(createClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}