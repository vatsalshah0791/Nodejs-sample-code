'use strict'


import { Router } from 'express'

import {
    createDentalTreatmentController,
    readDentalTreatmentsController,
    updateDentalTreatmentController,
    deleteDentalTreatmentController
} from './dependencies'

import { createDentalTreatmentSchema } from './schemas/createDentalTreatment.schema'
import { readDentalTreatmentsSchema } from './schemas/readDentalTreatment.schema'
import { updateDentalTreatmentSchema } from './schemas/updateDentalTreatment.schema'
import { deleteDentalTreatmentSchema } from './schemas/deleteDentalTreatment.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '13'


router.post(
    '/dentalTreatments',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createDentalTreatmentSchema),
    createDentalTreatmentController.run,
    refreshTokenController.run
)
router.get(
    '/dentalTreatments/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readDentalTreatmentsSchema),
    readDentalTreatmentsController.run,
    refreshTokenController.run
)
router.put(
    '/dentalTreatments/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateDentalTreatmentSchema),
    updateDentalTreatmentController.run,
    refreshTokenController.run
)
router.delete(
    '/dentalTreatments/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteDentalTreatmentSchema),
    deleteDentalTreatmentController.run,
    refreshTokenController.run
)


export default router