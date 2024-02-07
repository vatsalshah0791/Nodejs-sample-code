'use strict'


import { Router } from 'express'

import {
    readPlansControllers,
    readPlansByAdminController,
    createCustomerController,
    readPaymentsIntrumentByCustomerController,
    createCustomerPaymentInstrumentController,
    updateCustomerPaymentInstrumentController,
    deleteCustomerPaymentInstrumentController,
    verifyUpdatePlanController,
    createSubscriptionController,
    verifyPlanExpirationDateAdminController,
    verifyPlanExpirationDateCollaboratorController
} from './dependencies'

import { createCustomerPaymentInstrumentSchema } from './schemas/createCustomerPaymentInstrument.schema'
import { deleteCustomerPaymentInstrumentSchema } from './schemas/deleteCustomerPaymentInstrument.schema'
import { updateCustomerPaymentInstrumentSchema } from './schemas/updateCustomerPaymentInstrument.schema'
import { verifyUpdatePlanSchema } from './schemas/verifyUpdatePlan.schema'
import { createSubscriptionSchema } from './schemas/createSubscription.schema'

import {
    isAuthController,
    refreshTokenController,
    isAdmin,
    schemaValidator
} from './shared.import'


const router = Router()


router.get(
    '/plans',
    readPlansControllers.run,
    refreshTokenController.run
)
router.get(
    '/plans/cybs/verifyPlanExpirationDateCollaborator',
    isAuthController.run(),
    verifyPlanExpirationDateCollaboratorController.run,
    refreshTokenController.run
)

router.use(isAuthController.run(), isAdmin)
router.get(
    '/plans/admin',
    readPlansByAdminController.run,
    refreshTokenController.run
)
router.get(
    '/plans/cybs/verifyPlanExpirationDateAdmin',
    verifyPlanExpirationDateAdminController.run,
    refreshTokenController.run
)
router.get(
    '/plans/cybs/customerPaymentInstrument',
    readPaymentsIntrumentByCustomerController.run,
    refreshTokenController.run
)
router.post(
    '/plans/cybs/customer',
    createCustomerController.run,
    refreshTokenController.run
)
router.post(
    '/plans/cybs/customerPaymentInstrument',
    schemaValidator(createCustomerPaymentInstrumentSchema),
    createCustomerPaymentInstrumentController.run,
    refreshTokenController.run
)
router.post(
    '/plans/cybs/verifyUpdatePlan',
    schemaValidator(verifyUpdatePlanSchema),
    verifyUpdatePlanController.run,
    refreshTokenController.run
)
router.post(
    '/plans/cybs/subscription',
    schemaValidator(createSubscriptionSchema),
    createSubscriptionController.run,
    refreshTokenController.run
)
router.put(
    '/plans/cybs/customerPaymentInstrument/:paymentInstrumentId',
    schemaValidator(updateCustomerPaymentInstrumentSchema),
    updateCustomerPaymentInstrumentController.run,
    refreshTokenController.run
)
router.delete(
    '/plans/cybs/customerPaymentInstrument/:paymentInstrumentId',
    schemaValidator(deleteCustomerPaymentInstrumentSchema),
    deleteCustomerPaymentInstrumentController.run,
    refreshTokenController.run
)


export default router