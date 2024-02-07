'use strict'


import { NextFunction, Request, Response } from 'express'

import CreatePatientDentalTreatmentApplication from '../../application/CreatePatientDentalTreatment.application'

import { createPatientDentalTreatmentSchemaBodyType } from '../schemas/createPatientDentalTreatments.schema'


export default class CreatePatientTreatmentController {
    constructor(
        private readonly createPatientDentalTreatmentApplication: CreatePatientDentalTreatmentApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createPatientDentalTreatmentSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                discount: Number(req.body.discount),
                isDraft: req.body.isDraft,
                idSmPatient: req.body.idPatient,
                treatments: req.body.treatments.map(element => {
                    const newElement = {
                        dentalPiece: element.dentalPiece,
                        price: Number(element.price),
                        idSmDentalTreatment: element.idDentalTreatment,
                    }
                    return newElement
                })
            }
        }
        try {
            const createPatientDentalTreatmentApplicationResult = await this.createPatientDentalTreatmentApplication.run(payload.body)
            req.apiResponse = {
                success: createPatientDentalTreatmentApplicationResult.success,
                message: createPatientDentalTreatmentApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createPatientDentalTreatmentApplicationResult.success },
                language: { refresh: false },
            }
            res.status(createPatientDentalTreatmentApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}