'use strict'


import { NextFunction, Request, Response } from 'express'

import UpdateBacterialPlaqueApplication from '../../application/UpdateBacterialPlaque.application'

import { updateBacterialplaqueSchemaBodyType, updateBacterialplaqueSchemaParamsType } from '../schemas/updateBacterialPlaque.schema'


export default class UpdateBacterialPlaqueController {
    constructor(
        private readonly updateBacterialPlaqueApplication: UpdateBacterialPlaqueApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<updateBacterialplaqueSchemaParamsType, unknown, updateBacterialplaqueSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            body: {
                option: req.body.option,
                teeth: {
                    primaryTooth: req.body.teeth.primaryTooth,
                    absent: req.body.teeth.absent,
                    mesial: req.body.teeth.mesial,
                    lingual: req.body.teeth.lingual,
                    distal: req.body.teeth.distal,
                    bucal: req.body.teeth.bucal,
                    oclusal: req.body.teeth.oclusal
                }
            },
            params: {
                id: req.params.id,
                key: req.params.key
            }
        }
        try {
            const updateBacterialPlaqueApplicationResult = await this.updateBacterialPlaqueApplication.run({ ...payload.body, ...payload.params })
            req.apiResponse = {
                success: updateBacterialPlaqueApplicationResult.success,
                message: updateBacterialPlaqueApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateBacterialPlaqueApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateBacterialPlaqueApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}