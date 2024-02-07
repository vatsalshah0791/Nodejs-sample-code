'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateDentalHistoryNotesApplication from '../../application/UpdateDentalHistoryNotes.application'

import { updateDentalHistoryNotesSchemaBodyType, updateDentalHistoryNotesSchemaParamsType } from '../schemas/updateDentalHistoryNotes.schema'


export default class UpdateDentalHistoryNotesController {
    constructor(
        private readonly updateDentalHistoryNotesApplication: UpdateDentalHistoryNotesApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateDentalHistoryNotesSchemaParamsType, unknown, updateDentalHistoryNotesSchemaBodyType>,
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
            const updateDentalHistoryNotesApplicationResult = await this.updateDentalHistoryNotesApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateDentalHistoryNotesApplicationResult.success,
                message: updateDentalHistoryNotesApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateDentalHistoryNotesApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateDentalHistoryNotesApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}