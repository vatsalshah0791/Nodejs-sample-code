'use strict'


import { Router } from 'express'

import {
    readOrthodonticsController,
    updateExamNotesController,
    updateOrthodonticsController,
    updateOverbiteHorizontalController,
    updateOverbiteVerticalController,
    updateMiddleLineController
} from './dependencies'

import { readOrthodonticsSchema } from './schema/readOrthodontics.schema'
import { updateExamNotesSchema } from './schema/updateExamNotes.schema'
import { updateOrthodonticsSchema } from './schema/updateOrthodontics.schema'
import { updateOverbiteHorizontalSchema } from './schema/updateOverbiteHorizontal.schema'
import { updateOverbiteVerticalSchema } from './schema/updateOverbiteVertical.schema'
import { updateMiddleLineSchema } from './schema/updateMiddleLine.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '9'


router.get(
    '/orthodontics/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readOrthodonticsSchema),
    readOrthodonticsController.run,
    refreshTokenController.run
)
router.put(
    '/orthodontics/:id/updateNotes',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateExamNotesSchema),
    updateExamNotesController.run,
    refreshTokenController.run
)
router.put(
    '/orthodontics/:id/updateOverbiteHorizontal',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateOverbiteHorizontalSchema),
    updateOverbiteHorizontalController.run,
    refreshTokenController.run
)
router.put(
    '/orthodontics/:id/updateOverbiteVertical',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateOverbiteVerticalSchema),
    updateOverbiteVerticalController.run,
    refreshTokenController.run
)
router.put(
    '/orthodontics/:id/updateMiddleLine',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateMiddleLineSchema),
    updateMiddleLineController.run,
    refreshTokenController.run
)
router.put(
    '/orthodontics/:id/:key',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateOrthodonticsSchema),
    updateOrthodonticsController.run,
    refreshTokenController.run
)


export default router