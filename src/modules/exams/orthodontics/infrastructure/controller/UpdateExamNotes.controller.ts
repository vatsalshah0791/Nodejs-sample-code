'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateExamNotesApplication from '../../application/UpdateExamNotes.application'

import { updateExamNotesSchemaBodyType, updateExamNotesSchemaParamsType } from '../schema/updateExamNotes.schema'


export default class UpdateExamNotesController {
    constructor(
        private readonly updateExamNotesApplication: UpdateExamNotesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateExamNotesSchemaParamsType, unknown, updateExamNotesSchemaBodyType>,
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
            const updateExamNotesApplicationResut = await this.updateExamNotesApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateExamNotesApplicationResut.success,
                message: updateExamNotesApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateExamNotesApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateExamNotesApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}