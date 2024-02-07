'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadInventoryApplication from '../../application/ReadInventory.application'

import { readInventorySchemaParamsType } from '../schemas/readInventory.schema'

export default class ReadInventoryController {
    constructor(
        private readonly readInventoryApplication: ReadInventoryApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readInventorySchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const params = { idClinic: req.params.idClinic }
        try {
            const readInventoryApplicationResult = await this.readInventoryApplication.run(params)
            req.apiResponse = {
                success: readInventoryApplicationResult.success,
                message: readInventoryApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readInventoryApplicationResult.success},
                language: readInventoryApplicationResult.language,
                data: readInventoryApplicationResult.data
            }
            res.status(readInventoryApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}