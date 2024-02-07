'use strict'

import { NextFunction, Request, Response } from 'express'

import UpdateAppointmentApplication from '../../application/UpdateAppointment.application'

import {
    updateAppointmentSchemaBodyType,
    updateAppointmentSchemaParamsType
} from '../schemas/updateAppointment.schema'

export default class UpdateAppointmentController {
    constructor(
        private readonly updateAppointmentApplication: UpdateAppointmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateAppointmentSchemaParamsType, unknown, updateAppointmentSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const body = {
            id: req.params.id,
            appointmentDate: req.body.appointmentDate,
            startTime: req.body.startTime,
            endingTime: req.body.endingTime,
            annotations: req.body.annotations,
            idDentalChair: req.body.idDentalChair,
            idCollaborator: req.body.idCollaborator,
            idDentalTreatment: req.body.idDentalTreatment
        }
        try {
            const updateAppointmentApplicationResult = await this.updateAppointmentApplication.run(body)
            req.apiResponse = {
                success: updateAppointmentApplicationResult.success,
                message: updateAppointmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateAppointmentApplicationResult.success},
                language: updateAppointmentApplicationResult.language
            }
            res.status(updateAppointmentApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}