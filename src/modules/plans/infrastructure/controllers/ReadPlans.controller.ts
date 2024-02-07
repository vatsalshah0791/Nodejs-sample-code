'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPlansApplication from '../../application/ReadPlans.application'

import getListOfPlans from '../cybs/getListOfPlans'


export default class ReadPlansControllers {
    constructor(
        private readonly readPlansApplication: ReadPlansApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readPlansApplicationResult = await this.readPlansApplication.run()
            const plans = await getListOfPlans(readPlansApplicationResult.data)
            req.apiResponse = {
                success: readPlansApplicationResult.success,
                message: readPlansApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false },
                data: { plans }
            }
            res.status(readPlansApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}
