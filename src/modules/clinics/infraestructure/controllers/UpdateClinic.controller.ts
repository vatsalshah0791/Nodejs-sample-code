'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateClinicApplication from '../../application/UpdateClinic.application'

import { UpdateClinicSchemaBodyType, UpdateClinicSchemaParamsType } from '../schemas/updateClinic.schema'


export default class UpdateClinicController {
    constructor(
        private readonly updateClinicApplication: UpdateClinicApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<UpdateClinicSchemaParamsType, unknown, UpdateClinicSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                clinicName: req.body.clinicName,
                email: req.body.email,
                phonePrefix: req.body.phonePrefix,
                phone: req.body.phone,
                fullAddress: req.body.fullAddress,
                idAppCountry: req.body.idCountry,
                idAppTimeZone: req.body.idTimeZone,
                idAppCurrency: req.body.idCurrency
            },
            params: { id: req.params.id }
        }
        try {
            const updateClinicApplicationResult = await this.updateClinicApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateClinicApplicationResult.success,
                message: updateClinicApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateClinicApplicationResult.success },
                language: { refresh: false },
            }
            res.status(updateClinicApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}