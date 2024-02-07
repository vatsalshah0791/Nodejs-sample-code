'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadBacterialPlaqueApplication from '../../application/ReadBacterialPlaque.application'

import { readReadBactrialPlaqueSchemaParamsType } from '../schemas/readBacterialPlaque.schema'


export default class ReadBacterialPlaqueController {
    constructor(
        private readonly readBacterialPlaqueApplication: ReadBacterialPlaqueApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<readReadBactrialPlaqueSchemaParamsType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            params: {
                idSmPatient: req.params.idPatient
            }
        }
        try {
            const readBacterialPlaqueApplicationResult = await this.readBacterialPlaqueApplication.run(payload.params)
            req.apiResponse = {
                success: readBacterialPlaqueApplicationResult.success,
                message: readBacterialPlaqueApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readBacterialPlaqueApplicationResult.success },
                language: { refresh: false },
                data: readBacterialPlaqueApplicationResult.data
            }
            res.status(readBacterialPlaqueApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}