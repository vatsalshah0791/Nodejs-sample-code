'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateRentalExpenseApplication from '../../application/UpdateRentalExpense.application'

import { updateRentalExpenseSchemaBodyType, updateRentalExpenseSchemaParamsType } from '../schemas/updateRentalExpense.schema'


export default class UpdateRentalExpenseController {
    constructor(
        private readonly updateRentalExpenseApplication: UpdateRentalExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateRentalExpenseSchemaParamsType, unknown, updateRentalExpenseSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                rentalName: req.body.rentalName,
                amount: req.body.amount,
                isAvailable: req.body.isAvailable
            },
            params: { id: req.params.id }
        }
        try {
            const updateRentalExpenseApplicationResult = await this.updateRentalExpenseApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateRentalExpenseApplicationResult.success,
                message: updateRentalExpenseApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateRentalExpenseApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateRentalExpenseApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}