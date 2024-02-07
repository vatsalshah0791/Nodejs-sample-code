'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPlanApplication from '../../application/ReadPlan.application'
import ReadSubscriptionApplication from '../../application/ReadSubscription.application'

import { verifyUpdatePlanSchemaBodyTypes } from '../schemas/verifyUpdatePlan.schema'

import validatePlanUpdate from '../scripts/validatePlanUpdate'


export default class VerifyUpdatePlanController {
    constructor(
        private readonly readPlanApplication: ReadPlanApplication,
        private readonly readSubscriptionApplication: ReadSubscriptionApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, verifyUpdatePlanSchemaBodyTypes>,
        res: Response,
        next: NextFunction
    ) => {
        const payload = {
            idAccount: req.idAccount,
            body: { id: req.body.idPlan }
        }
        try {
            const readPlanApplicationResult = await this.readPlanApplication.run(payload.body)
            if(!readPlanApplicationResult.success) {
                req.apiResponse = {
                    success: readPlanApplicationResult.success,
                    message: readPlanApplicationResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(readPlanApplicationResult.statusCode)
                return next()
            }

            const readSubscriptionApplicationResult = await this.readSubscriptionApplication.run(payload)
            if(!readSubscriptionApplicationResult.success) {
                req.apiResponse = {
                    success: readSubscriptionApplicationResult.success,
                    message: readSubscriptionApplicationResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(readSubscriptionApplicationResult.statusCode)
                return next()
            }

            if(readSubscriptionApplicationResult.data?.idAppPlan === payload.body.id) {
                req.apiResponse = {
                    success: false,
                    message: 'The selected plan is the current plan.',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(409)
                return next()
            }

            const newPlan = readPlanApplicationResult.data as Record<string, number>
            const currentPlan = readSubscriptionApplicationResult.data
            const validatePlanUpdateResult = validatePlanUpdate({
                clinics: newPlan.clinics,
                dentalChairs: newPlan.dentalChairs,
                doctors: newPlan.doctors,
                collaborators: newPlan.collaborators,
                patients: newPlan.patients
            }, {
                clinics: currentPlan?.clinics as number,
                dentalChairs: currentPlan?.dentalChairs as [],
                doctors: currentPlan?.doctors as number,
                collaborators: currentPlan?.collaborators as number,
                patients: currentPlan?.patients as number
            })
            if(!validatePlanUpdateResult.success) {
                req.apiResponse = {
                    success: validatePlanUpdateResult.success,
                    message: validatePlanUpdateResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(409)
                return next()
            }
            req.apiResponse = {
                success: true,
                message: 'success',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            res.status(200)
            return next()
        } catch (error) {
            return this.errorHandler(error, req, res)
        }
    }
}