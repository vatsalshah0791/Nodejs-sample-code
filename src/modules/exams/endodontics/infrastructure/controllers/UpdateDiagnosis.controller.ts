'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateDiagnosisApplication from '../../application/UpdateDiagnosis.application'

import { updateDiagnosisSchemaBodyType, updateDiagnosisSchemaParamsType } from '../schemas/updateDiagnosis.schema'


export default class UpdateDiagnosisController {
    constructor(
        private readonly updateDiagnosisApplication: UpdateDiagnosisApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateDiagnosisSchemaParamsType, unknown, updateDiagnosisSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                value: req.body.value
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateDiagnosisApplicationResut = await this.updateDiagnosisApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateDiagnosisApplicationResut.success,
                message: updateDiagnosisApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateDiagnosisApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateDiagnosisApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}