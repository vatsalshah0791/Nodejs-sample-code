'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateClinicalExaminationApplication from '../../application/UpdateClinicalExamination.application'

import { updateClinicalExaminationSchemaBodyType, updateClinicalExaminationSchemaParamsType } from '../schemas/updateClinicalExamination.schema'


export default class UpdateClinicalExaminationController {
    constructor(
        private readonly updateClinicalExaminationApplication: UpdateClinicalExaminationApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateClinicalExaminationSchemaParamsType, unknown, updateClinicalExaminationSchemaBodyType>,
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
            const updateClinicalExaminationApplicationResut = await this.updateClinicalExaminationApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateClinicalExaminationApplicationResut.success,
                message: updateClinicalExaminationApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateClinicalExaminationApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateClinicalExaminationApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}