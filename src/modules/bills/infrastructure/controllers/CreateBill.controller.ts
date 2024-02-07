'use strict'

import { NextFunction, Request, Response } from 'express'

import CreateBillApplication from '../../application/CreateBill.application'

import { createBillSchemaBodyType } from '../schemas/createBill.schema'

export default class CreateBillController {
    constructor(
        private readonly createBillApplication: CreateBillApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createBillSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const body = {
            no: req.body.no,
            date: req.body.date,
            idProvider: req.body.idProvider,
            idClinic: req.body.idClinic,
            items: req.body.items
        }
        try {
            const createBillApplicationResult = await this.createBillApplication.run(body)
            req.apiResponse = {
                success: createBillApplicationResult.success,
                message: createBillApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && createBillApplicationResult.success},
                language: createBillApplicationResult.language,
                data: createBillApplicationResult.data
            }
            res.status(createBillApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}