'use strict'

import { NextFunction, Request, Response } from 'express'

import ReadDiscountPlansApplication from '../../application/ReadDiscountPlans.application'

export default class ReadDiscountPlansControllers {
    constructor(
        private readonly readDiscountPlansApplication: ReadDiscountPlansApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const readDiscountPlansApplicationResult = await this.readDiscountPlansApplication.run()
            req.apiResponse = {
                success: readDiscountPlansApplicationResult.success,
                message: readDiscountPlansApplicationResult.message,
                accessToken: { refresh: false },
                language: readDiscountPlansApplicationResult.language,
                data: readDiscountPlansApplicationResult.data
            }
            res.status(readDiscountPlansApplicationResult.statusCode)
            next()
            return
        } catch (error) {
            this.errorHandler(error, req, res)
        }
    }
}