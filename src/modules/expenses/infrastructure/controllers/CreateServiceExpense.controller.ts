'use strict'


import { NextFunction, Request, Response } from 'express'

import CreateServiceExpenseApplication from '../../application/CreateServiceExpense.application'

import { createServiceExpenseSchemaBodyType } from '../schemas/createServiceExpense.schema'


export default class CreateServiceExpenseController {
    constructor(
        private readonly createServiceExpenseApplication: CreateServiceExpenseApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createServiceExpenseSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                serviceName: req.body.serviceName,
                amount: req.body.amount,
                isAvailable: req.body.isAvailable,
                idSmClinic: req.body.idClinic
            }
        }
        try {
            const createServiceExpenseApplicationResult = await this.createServiceExpenseApplication.run(payload.body)
            req.apiResponse = {
                success: createServiceExpenseApplicationResult.success,
                message: createServiceExpenseApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createServiceExpenseApplicationResult.success },
                language: { refresh: false },
                data: createServiceExpenseApplicationResult.data
            }
            res.status(createServiceExpenseApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}