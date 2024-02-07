'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateRentalExpenseApplication from '../../application/CreateRentalExpense.application'

import { createRentalExpenseSchemaBodyType } from '../schemas/createRentalExpense.schema'


export default class CreateRentalExpenseController {
    constructor(
        private readonly createRentalExpenseApplication: CreateRentalExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createRentalExpenseSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                rentalName: req.body.rentalName,
                amount: req.body.amount,
                isAvailable: req.body.isAvailable,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createRentalExpenseApplicationResult = await this.createRentalExpenseApplication.run(payload.body)
            req.apiResponse = {
                success: createRentalExpenseApplicationResult.success,
                message: createRentalExpenseApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createRentalExpenseApplicationResult.success },
                language: { refresh: false },
                data: createRentalExpenseApplicationResult.data
            }
            res.status(createRentalExpenseApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}