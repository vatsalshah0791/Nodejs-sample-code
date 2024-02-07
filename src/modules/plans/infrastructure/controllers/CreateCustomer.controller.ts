'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadCustomerApplication from '../../application/ReadCustomer.application'
import UpdateIdCustomerApplication from '../../application/UpdateIdCustomer.application'

import createCustomer from '../cybs/createCustomer'


export default class CreateCustomerController {
    constructor(
        private readonly readCustomerApplication: ReadCustomerApplication,
        private readonly updateIdCustomerApplication: UpdateIdCustomerApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (req: Request, res: Response, next: NextFunction) => {
        const payload = { idAccount: req.idAccount }
        try {
            const readCustomerApplicationResult = await this.readCustomerApplication.run(payload)
            if(!readCustomerApplicationResult.success) {
                req.apiResponse = {
                    success: readCustomerApplicationResult.success,
                    message: readCustomerApplicationResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(readCustomerApplicationResult.statusCode)
                return next()
            }
            if(readCustomerApplicationResult.data?.customerId) {
                req.apiResponse = {
                    success: true,
                    message: 'Success',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(200)
                return next()
            }

            const customerId = await createCustomer({
                email: readCustomerApplicationResult.data?.email as string,
                id: payload.idAccount
            })
            if(!customerId) {
                req.apiResponse = {
                    success: false,
                    message: 'Error creating a client in cybersource',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(500)
                return next()
            }
            const updateIdCustomerApplicationResult = await this.updateIdCustomerApplication.run({
                idAccount: payload.idAccount,
                customerId: customerId
            })
            req.apiResponse = {
                success: updateIdCustomerApplicationResult.success,
                message: updateIdCustomerApplicationResult.message,
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(201)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}
