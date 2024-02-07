'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadBillApplication from '../../application/ReadBill.application'

import { readBillSchemaParamsType } from '../schemas/readBill.schema'

export default class ReadBillController {
    constructor(
        private readonly readBillApplication: ReadBillApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readBillSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const params = { id: req.params.id }
        try {
            const readBillApplicationResult = await this.readBillApplication.run(params)
            req.apiResponse = {
                success: readBillApplicationResult.success,
                message: readBillApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readBillApplicationResult.success},
                language: readBillApplicationResult.language,
                data: readBillApplicationResult.data
            }
            res.status(readBillApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}