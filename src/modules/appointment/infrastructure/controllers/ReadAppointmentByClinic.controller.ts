'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadAppointmentsByClinicApplication from '../../application/ReadAppointmentsByClinic.application'

import { readAppointmentsByClinicSchemaParamsType } from '../schemas/readAppointmentsByClinic.shema'

export default class ReadAppointmentsByClinicController {
    constructor(
        private readonly readAppointmentsByClinicApplication: ReadAppointmentsByClinicApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readAppointmentsByClinicSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const params = { idClinic: req.params.idClinic }
        try {
            const readAppointmentsByClinicApplicationResult = await this.readAppointmentsByClinicApplication.run(params)
            req.apiResponse = {
                success: readAppointmentsByClinicApplicationResult.success,
                message: readAppointmentsByClinicApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readAppointmentsByClinicApplicationResult.success},
                language: readAppointmentsByClinicApplicationResult.language,
                data: readAppointmentsByClinicApplicationResult.data
            }
            res.status(readAppointmentsByClinicApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}