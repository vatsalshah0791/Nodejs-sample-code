'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCommissionsByDoctorApplication from '../../application/ReadCommissionsByDoctor.application'

import { readCommissionsByDoctorSchemaBodyType } from '../schemas/readCommissionsByDoctor.schema'


export default class ReadCommissionsByDoctorController {
    constructor(
        private readonly readCommissionsByDoctorApplication: ReadCommissionsByDoctorApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, readCommissionsByDoctorSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                idClinic: req.body.idClinic,
                idCollaborator: req.body.idCollaborator
            }
        }
        try {
            const readCommissionsByDoctorApplicationResult = await this.readCommissionsByDoctorApplication.run(payload.body)
            req.apiResponse = {
                success: readCommissionsByDoctorApplicationResult.success,
                message: readCommissionsByDoctorApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: readCommissionsByDoctorApplicationResult.data
            }
            res.status(readCommissionsByDoctorApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}