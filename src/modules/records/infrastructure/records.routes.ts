'use strict'


import { Router } from 'express'

import {
    readRecordController,
    updateMedicalHistoryNotesController,
    updateDentalHistoryNotesController,
    updateRecordController
} from './dependencies'

import { readRecordSchema } from './schemas/readRecord.schema'
import { updateMedicalHistoryNotesSchema } from './schemas/updateMedicalHistoryNotes.schema'
import { updateDentalHistoryNotesSchema } from './schemas/updateDentalHistoryNotes.schema'
import { updateRecordSchema } from './schemas/updateRecord'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '7'


router.get(
    '/records/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readRecordSchema),
    readRecordController.run,
    refreshTokenController.run
)
router.put(
    '/records/:id/updateMedicalHistoryNotes',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateMedicalHistoryNotesSchema),
    updateMedicalHistoryNotesController.run,
    refreshTokenController.run
)
router.put(
    '/records/:id/updateDentalHistoryNotes',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateDentalHistoryNotesSchema),
    updateDentalHistoryNotesController.run,
    refreshTokenController.run
)
router.put(
    '/records/:id/:key',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateRecordSchema),
    updateRecordController.run,
    refreshTokenController.run
)


export default router