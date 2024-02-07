'use strict'


import { NextFunction, Request, Response } from 'express'

import DeleteDentalChairApplication from '../../application/DeleteDentalChair.application'

import { deleteDentalChairSchemaParamsType } from '../schemas/deleteDentalChair.schema'


export default class DeleteDentalChairController {
    constructor(
        private readonly deleteDentalChairApplication: DeleteDentalChairApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<deleteDentalChairSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: { id: req.params.id }
        }
        try {
            const deleteDentalChairApplicationResult = await this.deleteDentalChairApplication.run(payload.params)
            req.apiResponse = {
                success: deleteDentalChairApplicationResult.success,
                message: deleteDentalChairApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && deleteDentalChairApplicationResult.success },
                language: { refresh: false },
            }
            res.status(deleteDentalChairApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}