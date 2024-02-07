'use strict'


import { Router } from 'express'

import { readPatientPaymentMethodController } from './dependencies'

import {
    isAuthController,
    refreshTokenController
} from './shared.import'


const router = Router()


router.get(
    '/patientPaymentMethods',
    isAuthController.run(),
    readPatientPaymentMethodController.run,
    refreshTokenController.run
)


export default router