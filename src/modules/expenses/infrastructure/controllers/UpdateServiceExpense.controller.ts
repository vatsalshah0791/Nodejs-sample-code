'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateServiceExpenseApplication from '../../application/UpdateServiceExpense.application'

import { updateServiceExpenseSchemaBodyType, updateServiceExpenseSchemaParamsType } from '../schemas/updateServiceExpense.schema'


export default class UpdateServiceExpenseController {
    constructor(
        private readonly updateServiceExpenseApplication: UpdateServiceExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateServiceExpenseSchemaParamsType, unknown, updateServiceExpenseSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                serviceName: req.body.serviceName,
                amount: req.body.amount,
                isAvailable: req.body.isAvailable
            },
            params: { id: req.params.id }
        }
        try {
            const updateServiceExpenseApplicationResult = await this.updateServiceExpenseApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateServiceExpenseApplicationResult.success,
                message: updateServiceExpenseApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateServiceExpenseApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateServiceExpenseApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}