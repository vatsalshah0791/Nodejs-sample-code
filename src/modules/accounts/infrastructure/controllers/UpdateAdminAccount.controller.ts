'use strict'


import { Request, Response, NextFunction } from 'express'

import UpdateAdminAccountApplication from '../../application/UpdateAdminAccount.application'

import { updateAdminAccountSchemaBodyType } from '../schemas/updateAdminAccount.schema'


export default class UpdateAdminAccountController {
    constructor(
        private readonly updateAdminAccountApplication: UpdateAdminAccountApplication,
        private readonly errorHandler: Function
    ){}
    run = async (
        req: Request<unknown, unknown, updateAdminAccountSchemaBodyType>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phonePrefix: req.body.phonePrefix || null,
                phone: req.body.phone || null,
                companyName: req.body.companyName,
                birthDate: req.body.birthDate,
                idAppGender: req.body.idGender,
                idAppCountry: req.body.idCountry,
            }
        }
        try {
            const updateAdminAccountApplicationResult = await this.updateAdminAccountApplication.run({ ...payload.body, idAccount: payload.idAccount })
            req.apiResponse = {
                success: updateAdminAccountApplicationResult.success,
                message: updateAdminAccountApplicationResult.message,
                accessToken: { refresh: req.accessTokenNeedRefresh && updateAdminAccountApplicationResult.success },
                language: { refresh: false }
            }
            res.status(updateAdminAccountApplicationResult.statusCode)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}