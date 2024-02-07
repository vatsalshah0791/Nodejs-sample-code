'use strict'


import { Router } from 'express'

import {
    readAtmController,
    updateExamNotesController,
    updateAtmController,
    updateAtmMultilineController
} from './dependencies'

import { readAtmSchema } from './schema/readAtm.schemas'
import { updateExamNotesSchema } from './schema/updateExamNotes.schema'
import { updateAtmSchema } from './schema/updateAtm.schema'
import { updateAtmMultilineSchema } from './schema/updateAtmMultiline.schema'

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
    '/atm/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readAtmSchema),
    readAtmController.run,
    refreshTokenController.run
)
router.put(
    '/atm/:id/updateNotes',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateExamNotesSchema),
    updateExamNotesController.run,
    refreshTokenController.run
)
router.put(
    '/atm/:id/:key',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateAtmSchema),
    updateAtmController.run,
    refreshTokenController.run
)
router.put(
    '/atm/:id/:key/multiline',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateAtmMultilineSchema),
    updateAtmMultilineController.run,
    refreshTokenController.run
)


export default router