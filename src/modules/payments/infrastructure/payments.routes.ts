'use strict'


import { Router } from 'express'

import {
    createPaymentController,
    readPaymentsByPatientsController,
    readPaymentsByTreatmentController,
} from './dependencies'

import { createPaymentSchema } from './schemas/createPayment.schema'
import { readPaymentsByTreatmentSchema } from './schemas/readPaymentsByTreatment.schema'
import { readPaymentsByPatientSchema } from './schemas/readPaymentsByPatient.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '8'


router.post(
    '/payments',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createPaymentSchema),
    createPaymentController.run,
    refreshTokenController.run
)
router.get(
    '/payments/treatment/:idPatientDentalTreatment',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPaymentsByTreatmentSchema),
    readPaymentsByTreatmentController.run,
    refreshTokenController.run
)
router.get(
    '/payments/patient/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPaymentsByPatientSchema),
    readPaymentsByPatientsController.run,
    refreshTokenController.run
)


export default router