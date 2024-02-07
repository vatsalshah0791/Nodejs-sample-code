'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadAppointmentApplication from '../../application/ReadAppointment.application'

import { readAppointmentSchemaParamsType } from '../schemas/readAppointment.schema'

export default class ReadAppointmentController {
    constructor(
        private readonly readAppointmentApplication: ReadAppointmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readAppointmentSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const params = { id: req.params.id }
        try {
            const readAppointmentApplicationResult = await this.readAppointmentApplication.run(params)
            req.apiResponse = {
                success: readAppointmentApplicationResult.success,
                message: readAppointmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readAppointmentApplicationResult.success},
                language: readAppointmentApplicationResult.language,
                data: readAppointmentApplicationResult.data
            }
            res.status(readAppointmentApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}