'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateOtherExpenseApplication from '../../application/UpdateOtherExpense.application'

import { updateOtherExpenseSchemaBodyType, updateOtherExpenseSchemaParamsType } from '../schemas/updateOtherExpense.schema'


export default class UpdateOtherExpenseController {
    constructor(
        private readonly updateOtherExpenseApplication: UpdateOtherExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateOtherExpenseSchemaParamsType, unknown, updateOtherExpenseSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                otherExpense: req.body.otherExpense,
                amount: req.body.amount,
                isAvailable: req.body.isAvailable
            },
            params: { id: req.params.id }
        }
        try {
            const updateOtherExpenseApplicationResult = await this.updateOtherExpenseApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateOtherExpenseApplicationResult.success,
                message: updateOtherExpenseApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateOtherExpenseApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateOtherExpenseApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}