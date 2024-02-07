'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateMedicalHistoryNotesApplication from '../../application/UpdateMedicalHistoryNotes.application'

import { updateMedicalHistoryNotesSchemaBodyType, updateMedicalHistoryNotesSchemaParamsType } from '../schemas/updateMedicalHistoryNotes.schema'


export default class UpdateMedicalHistoryNotesController {
    constructor(
        private readonly updateMedicalHistoryNotesApplication: UpdateMedicalHistoryNotesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateMedicalHistoryNotesSchemaParamsType, unknown, updateMedicalHistoryNotesSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                note: req.body.note
            },
            params: {
                id: req.params.id
            }
        }
        try {
            const updateMedicalHistoryNotesApplicationResult = await this.updateMedicalHistoryNotesApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateMedicalHistoryNotesApplicationResult.success,
                message: updateMedicalHistoryNotesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateMedicalHistoryNotesApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateMedicalHistoryNotesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}