'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateClinicalExaminationMultilineApplication from '../../application/UpdateClinicalExaminationMultiline.application'

import { updateClinicalExaminationMultilineSchemaBodyType, updateClinicalExaminationMultilineSchemaParamsType } from '../schemas/updateClinicalExaminationMultiline.schema'


export default class UpdateClinicalExaminationMultilineController {
    constructor(
        private readonly updateClinicalExaminationMultilineApplication: UpdateClinicalExaminationMultilineApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateClinicalExaminationMultilineSchemaParamsType, unknown, updateClinicalExaminationMultilineSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                title: req.body.title,
                value: req.body.value
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateClinicalExaminationMultilineApplicationResut = await this.updateClinicalExaminationMultilineApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateClinicalExaminationMultilineApplicationResut.success,
                message: updateClinicalExaminationMultilineApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateClinicalExaminationMultilineApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateClinicalExaminationMultilineApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}