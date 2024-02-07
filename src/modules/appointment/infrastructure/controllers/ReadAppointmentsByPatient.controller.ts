'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadAppointmentsByPatientApplication from '../../application/ReadAppointmentsByPatient.application'

import { readAppointmentsByPatientSchemaParamsType } from '../schemas/readAppointmentsByPatient.schema'

export default class ReadAppointmentsByPatientController {
    constructor(
        private readonly readAppointmentsByPatientApplication: ReadAppointmentsByPatientApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readAppointmentsByPatientSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const params = { idPatient: req.params.idPatient }
        try {
            const readAppointmentsByPatientApplicationResult = await this.readAppointmentsByPatientApplication.run(params)
            req.apiResponse = {
                success: readAppointmentsByPatientApplicationResult.success,
                message: readAppointmentsByPatientApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readAppointmentsByPatientApplicationResult.success},
                language: readAppointmentsByPatientApplicationResult.language,
                data: readAppointmentsByPatientApplicationResult.data
            }
            res.status(readAppointmentsByPatientApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}