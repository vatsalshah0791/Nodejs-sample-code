'use strict'


import { Router } from 'express'

import {
    createPatientDentalTreatmentController,
    readPatientDentalTreatmentsConfirmedController,
    readPatientDentalTreatmentsDraftsController,
    confirmPatientDentalTreatmentController,
    cancelPatientDentalTreatmentController,
    toggleStatusPatientDentalTreatmentController
} from './dependencies'

import { createPatientDentalTreatmentSchema } from './schemas/createPatientDentalTreatments.schema'
import { readPatientDentalTreatmentsConfirmedSchema } from './schemas/readPatientDentalTreatmentsConfirmed.schema'
import { readPatientDentalTreatmentsDraftsSchema } from './schemas/readPatientDentalTreatmentsDrafts.schema'
import { updatePatientDentalTreatmentSchema } from './schemas/updatePatientDentalTreatment.schema'
import { toggleStatusPatientDentalTreatmentSchema } from './schemas/toggleStatusPatientDentalTreatment.schema'

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
    '/patientDentalTreatments',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createPatientDentalTreatmentSchema),
    createPatientDentalTreatmentController.run,
    refreshTokenController.run
)
router.get(
    '/patientDentalTreatments/:idPatient/confirmed',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPatientDentalTreatmentsConfirmedSchema),
    readPatientDentalTreatmentsConfirmedController.run,
    refreshTokenController.run
)
router.get(
    '/patientDentalTreatments/:idPatient/drafts',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPatientDentalTreatmentsDraftsSchema),
    readPatientDentalTreatmentsDraftsController.run,
    refreshTokenController.run
)
router.put(
    '/patientDentalTreatments/:id/confirm',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updatePatientDentalTreatmentSchema),
    confirmPatientDentalTreatmentController.run,
    refreshTokenController.run
)
router.put(
    '/patientDentalTreatments/:id/cancel',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updatePatientDentalTreatmentSchema),
    cancelPatientDentalTreatmentController.run,
    refreshTokenController.run
)
router.put(
    '/patientDentalTreatments/:id/togglestatus',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(toggleStatusPatientDentalTreatmentSchema),
    toggleStatusPatientDentalTreatmentController.run,
    refreshTokenController.run
)


export default router