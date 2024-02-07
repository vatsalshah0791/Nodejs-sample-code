'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPaymentsByPatientsApplication from '../../application/ReadPaymentsByPatients.application'

import { readPaymentsByPatientSchemaParamsType } from '../schemas/readPaymentsByPatient.schema'


export default class ReadPaymentsByPatientsController {
    constructor(
        private readonly readPaymentsByPatientsApplication: ReadPaymentsByPatientsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readPaymentsByPatientSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { idPatient: req.params.idPatient }
        }
        try {
            const readPaymentsByPatientsApplicationResult = await this.readPaymentsByPatientsApplication.run(payload.params)
            req.apiResponse = {
                success: readPaymentsByPatientsApplicationResult.success,
                message: readPaymentsByPatientsApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPaymentsByPatientsApplicationResult.success },
                language: { refresh: false },
                data: readPaymentsByPatientsApplicationResult.data
            }
            res.status(readPaymentsByPatientsApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}