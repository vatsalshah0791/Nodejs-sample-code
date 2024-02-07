'use strict'

import { NextFunction, Request, Response } from 'express'

import CreateAppointmentApplication from '../../application/CreateAppointment.application'

import { createAppointmentSchemaBodyTypes } from '../schemas/createAppointment.schema'

export default class CreateAppointmentController {
    constructor(
        private readonly createAppointmentApplication: CreateAppointmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createAppointmentSchemaBodyTypes>,
        res: Response,
        next: NextFunction
    ) => {
        const body = {
            appointmentDate: req.body.appointmentDate,
            startTime: req.body.startTime,
            endingTime: req.body.endingTime,
            annotations: req.body.annotations,
            idDentalChair: req.body.idDentalChair,
            idCollaborator: req.body.idCollaborator,
            idDentalTreatment: req.body.idDentalTreatment,
            idPatient: req.body.idPatient,
            idClinic: req.body.idClinic
        }
        try {
            const createAppointmentApplicationResult = await this.createAppointmentApplication.run(body)
            req.apiResponse = {
                success: createAppointmentApplicationResult.success,
                message: createAppointmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createAppointmentApplicationResult.success},
                language: createAppointmentApplicationResult.language,
                data: createAppointmentApplicationResult.data
            }
            res.status(createAppointmentApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}