'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteOtherExpenseApplication from '../../application/DeleteOtherExpense.application'

import { deleteFixedCostsSchemaParamsType } from '../schemas/deleteFixedCosts.schema'


export default class DeleteOtherExpenseController {
    constructor(
        private readonly deleteOtherExpenseApplication: DeleteOtherExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deleteFixedCostsSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const deleteOtherExpenseApplicationRestul = await this.deleteOtherExpenseApplication.run(payload.params)
            req.apiResponse = {
                success: deleteOtherExpenseApplicationRestul.success,
                message: deleteOtherExpenseApplicationRestul.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteOtherExpenseApplicationRestul.success },
                language: { refresh: false }
            }
            res.status(deleteOtherExpenseApplicationRestul.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}