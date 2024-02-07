'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPlansByAdminApplication from '../../application/ReadPlansByAdmin.applications'

import getListOfPlans from '../cybs/getListOfPlans'


export default class ReadPlansByAdminController {
    constructor(
        private readonly readPlansByAdminApplication: ReadPlansByAdminApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const readPlansByAdminApplicationResult = await this.readPlansByAdminApplication.run(payload)
            const plans = await getListOfPlans(readPlansByAdminApplicationResult.data)
            req.apiResponse = {
                success: readPlansByAdminApplicationResult.success,
                message: readPlansByAdminApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && readPlansByAdminApplicationResult.success },
                language: { refresh: false },
                data: { plans }
            }
            res.status(readPlansByAdminApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}
