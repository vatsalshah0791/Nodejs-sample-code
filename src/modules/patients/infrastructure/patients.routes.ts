'use strict'


import { Router } from 'express'

import {
    createPatientController,
    readPatientsController,
    readPatientController,
    readPatientsStatisticsController,
    updatePhotoController,
    updatePatientController
} from './dependencies'

import { createPatientSchema } from './schemas/createPatient.schema'
import { readPatientsSchema } from './schemas/readPatients.schema'
import { readPatientSchema } from './schemas/readPatient.schema'
import { readPatientsStatisticsSchema } from './schemas/readPatientsStatistics.schema'
import { updatePhotoSchema } from './schemas/updatePhoto.schema'
import { updatePatientSchema } from './schemas/updatePatient.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    upload,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '7'


router.post(
    '/patients',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    upload({ nonFileFields: 19 }),
    schemaValidator(createPatientSchema),
    createPatientController.run,
    refreshTokenController.run
)
router.get(
    '/patients/clinic/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPatientsSchema),
    readPatientsController.run,
    refreshTokenController.run
)
router.get(
    '/patients/:id',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPatientSchema),
    readPatientController.run,
    refreshTokenController.run
)
router.get(
    '/patients/statistics/:id',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPatientsStatisticsSchema),
    readPatientsStatisticsController.run,
    refreshTokenController.run
)
router.put(
    '/patients/:id/updatePhoto',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    upload(),
    schemaValidator(updatePhotoSchema),
    updatePhotoController.run,
    refreshTokenController.run
)
router.put(
    '/patients/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updatePatientSchema),
    updatePatientController.run,
    refreshTokenController.run
)


export default router