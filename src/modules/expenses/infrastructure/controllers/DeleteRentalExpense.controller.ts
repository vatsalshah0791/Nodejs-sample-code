'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteRentalExpenseApplication from '../../application/DeleteRentalExpense.application'

import { deleteFixedCostsSchemaParamsType } from '../schemas/deleteFixedCosts.schema'


export default class DeleteRentalExpenseController {
    constructor(
        private readonly deleteRentalExpenseApplication: DeleteRentalExpenseApplication,
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
            const deleteRentalExpenseApplicationRestul = await this.deleteRentalExpenseApplication.run(payload.params)
            req.apiResponse = {
                success: deleteRentalExpenseApplicationRestul.success,
                message: deleteRentalExpenseApplicationRestul.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteRentalExpenseApplicationRestul.success },
                language: { refresh: false }
            }
            res.status(deleteRentalExpenseApplicationRestul.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}