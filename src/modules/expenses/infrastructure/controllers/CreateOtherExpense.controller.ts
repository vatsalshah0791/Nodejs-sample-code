'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateOtherExpenseApplication from '../../application/CreateOtherExpense.application'

import { createOtherExpenseSchemaBodyType } from '../schemas/createOtherExpense.schema'


export default class CreateOtherExpenseController {
    constructor(
        private readonly createOtherExpenseApplication: CreateOtherExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createOtherExpenseSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                otherExpense: req.body.otherExpense,
                amount: req.body.amount,
                isAvailable: req.body.isAvailable,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createOtherExpenseApplicationResult = await this.createOtherExpenseApplication.run(payload.body)
            req.apiResponse = {
                success: createOtherExpenseApplicationResult.success,
                message: createOtherExpenseApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createOtherExpenseApplicationResult.success },
                language: { refresh: false },
                data: createOtherExpenseApplicationResult.data
            }
            res.status(createOtherExpenseApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}