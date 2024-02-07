'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteServiceExpenseApplication from '../../application/DeleteServiceExpense.application'

import { deleteFixedCostsSchemaParamsType } from '../schemas/deleteFixedCosts.schema'


export default class DeleteServiceExpenseController {
    constructor(
        private readonly deleteServiceExpenseApplication: DeleteServiceExpenseApplication,
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
            const deleteServiceExpenseApplicationRestul = await this.deleteServiceExpenseApplication.run(payload.params)
            req.apiResponse = {
                success: deleteServiceExpenseApplicationRestul.success,
                message: deleteServiceExpenseApplicationRestul.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteServiceExpenseApplicationRestul.success },
                language: { refresh: false }
            }
            res.status(deleteServiceExpenseApplicationRestul.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}