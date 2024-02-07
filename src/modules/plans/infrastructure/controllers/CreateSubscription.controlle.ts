'use strict'


import { NextFunction, Request, Response } from 'express'

import ReadPlanApplication from '../../application/ReadPlan.application'
import ReadSubscriptionApplication from '../../application/ReadSubscription.application'
import UpdateSubscriptionApplication from '../../application/UpdateSubscription.application'

import { createSubscriptionSchemaBodyTypes } from '../schemas/createSubscription.schema'

import getListOfPlansByCode from '../cybs/getListOfPlansByCode'
import updateSubscription from '../cybs/updateSubscription'
import createSubscription from '../cybs/createSubscription'

import validatePlanUpdate from '../scripts/validatePlanUpdate'


export default class CreateSubscriptionController {
    constructor(
        private readonly readPlanApplication: ReadPlanApplication,
        private readonly readSubscriptionApplication: ReadSubscriptionApplication,
        private readonly updateSubscriptionApplication: UpdateSubscriptionApplication,
        private readonly errorHandler: Function
    ) {}
    run = async (
        req: Request<unknown, unknown, createSubscriptionSchemaBodyTypes>,
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
            const planId = await getListOfPlansByCode({ planCode: readPlanApplicationResult.data?.planCode as string })

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

            if(!readSubscriptionApplicationResult.data?.customerId) {
                req.apiResponse = {
                    success: false,
                    message: 'The account does not have an idCustomer',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(400)
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

            if(readSubscriptionApplicationResult.data?.subscriptionId) {
                await updateSubscription({ planId, subscriptionId: readSubscriptionApplicationResult.data.subscriptionId })
                const updateSubscriptionApplicationResult = await this.updateSubscriptionApplication.run({
                    idAccount: payload.idAccount,
                    subscriptionId: readSubscriptionApplicationResult.data.subscriptionId,
                    idAppPlan: payload.body.id
                })
                if(!updateSubscriptionApplicationResult.success) {
                    req.apiResponse = {
                        success: updateSubscriptionApplicationResult.success,
                        message: updateSubscriptionApplicationResult.message,
                        accessToken: { refresh: false },
                        language: { refresh: false }
                    }
                    res.status(updateSubscriptionApplicationResult.statusCode)
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
            }

            const subscriptionId = await createSubscription({
                planId,
                name: payload.idAccount,
                customerId: readSubscriptionApplicationResult.data?.customerId as string
            })
            if(!subscriptionId) {
                req.apiResponse = {
                    success: false,
                    message: 'Error creating subscription',
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(500)
                return next()
            }

            const updateSubscriptionApplicationResult = await this.updateSubscriptionApplication.run({
                idAccount: payload.idAccount,
                subscriptionId,
                idAppPlan: payload.body.id
            })
            if(!updateSubscriptionApplicationResult.success) {
                req.apiResponse = {
                    success: updateSubscriptionApplicationResult.success,
                    message: updateSubscriptionApplicationResult.message,
                    accessToken: { refresh: false },
                    language: { refresh: false }
                }
                res.status(updateSubscriptionApplicationResult.statusCode)
                return next()
            }
            req.apiResponse = {
                success: true,
                message: 'success',
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