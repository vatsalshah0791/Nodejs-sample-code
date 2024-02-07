'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateQuestionsApplication from '../../application/UpdateQuestions.application'

import { updateQuestionsSchemaBodyType, updateQuestionsSchemaParamsType } from '../schemas/updateQuestions.schema'


export default class UpdateQuestionsController {
    constructor(
        private readonly updateQuestionsApplication: UpdateQuestionsApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateQuestionsSchemaParamsType, unknown, updateQuestionsSchemaBodyType>,
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
            const updateQuestionsApplicationResut = await this.updateQuestionsApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateQuestionsApplicationResut.success,
                message: updateQuestionsApplicationResut.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateQuestionsApplicationResut.success },
                language: { refresh: false }
            }
            res.status(updateQuestionsApplicationResut.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}