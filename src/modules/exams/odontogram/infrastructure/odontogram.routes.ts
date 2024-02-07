'use strict'


import { Router } from 'express'

import {
    readOdontogramController,
    readOdontogramTeethController,
    updateQuestionsController,
    updateGeneralOdontologyController,
    updateProsthesisController,
    updateProsthesisMultilineController,
    updateEndodonticsController,
    updateOrthodonticsController
} from './dependencies'

import { readOdontogramSchema } from './schemas/readOdontogram.schema'
import { readOdontogramTeethSchema } from './schemas/readOdontogramTeeth.schema'
import { updateQuestionsSchema } from './schemas/updateQuestions.schema'
import { updateGeneralOdontologySchema } from './schemas/updateGeneralOdontology.schema'
import { updateProsthesisSchema } from './schemas/updateProsthesis.schema'
import { updateProsthesisMultilineSchema } from './schemas/updateProsthesisMultiline.schema'
import { updateEndodonticsSchema } from './schemas/updateEndodontics.schema'
import { updateOrthodonticsSchema } from './schemas/updateOrthodontics.schema'

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
    '/odontogram/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readOdontogramSchema),
    readOdontogramController.run,
    refreshTokenController.run
)
router.get(
    '/odontogram/:idPatient/:teeth',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readOdontogramTeethSchema),
    readOdontogramTeethController.run,
    refreshTokenController.run
)
router.put(
    '/odontogram/questions/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateQuestionsSchema),
    updateQuestionsController.run,
    refreshTokenController.run
)
router.put(
    '/odontogram/generalOdontology/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateGeneralOdontologySchema),
    updateGeneralOdontologyController.run,
    refreshTokenController.run
)
router.put(
    '/odontogram/prosthesis/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateProsthesisSchema),
    updateProsthesisController.run,
    refreshTokenController.run
)
router.put(
    '/odontogram/prosthesis/:id/multiline',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateProsthesisMultilineSchema),
    updateProsthesisMultilineController.run,
    refreshTokenController.run
)
router.put(
    '/odontogram/endodontics/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateEndodonticsSchema),
    updateEndodonticsController.run,
    refreshTokenController.run
)
router.put(
    '/odontogram/orthodontics/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateOrthodonticsSchema),
    updateOrthodonticsController.run,
    refreshTokenController.run
)


export default router