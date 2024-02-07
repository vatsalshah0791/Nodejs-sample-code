'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadEndodonticsTeethApplication from '../../application/ReadEndodonticsTeeth.application'

import { readEndodonticsTeethSchemaParamsType } from '../schemas/readEndodonticsTeeth.schemas'


export default class ReadEndodonticsTeethController {
    constructor(
        private readonly readEndodonticsTeethApplication: ReadEndodonticsTeethApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readEndodonticsTeethSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient,
                teeth: Number(req.params.teeth)
            }
        }
        try {
            const readEndodonticsTeethApplicationResult = await this.readEndodonticsTeethApplication.run(payload.params)
            req.apiResponse = {
                success: readEndodonticsTeethApplicationResult.success,
                message: readEndodonticsTeethApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readEndodonticsTeethApplicationResult.success },
                language: { refresh: false },
                data: readEndodonticsTeethApplicationResult.data
            }
            res.status(readEndodonticsTeethApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}