'use strict'


import { Router } from 'express'

import {
    readPeriodontogramController,
    readPeriodontogramTeethController,
    updateQuestionsController,
    updateMobilityController,
    updateFurcationInjuryController,
    updateGingivalMarginController,
    updatePeriodontalPocketController
} from './dependencies'

import { readPeriodontogramSchema } from './schemas/readPeriodontogram.schema'
import { readPeriodontogramTeethSchema } from './schemas/readPeriodontogramTeeth.schema'
import { updateQuestionsSchema } from './schemas/updateQuestions.schema'
import { updateMobilitySchema } from './schemas/updateMobility.schemas'
import { updateFurcationInjurySchema } from './schemas/updateFurcationInjury.schema'
import { updateGingivalMarginSchema } from './schemas/updateGingivalMargin.schemas'
import { updatePeriodontalPocketSchema } from './schemas/updatePeriodontalPocket.schemas'

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
    '/periodontogram/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPeriodontogramSchema),
    readPeriodontogramController.run,
    refreshTokenController.run
)
router.get(
    '/periodontogram/:idPatient/:teeth',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPeriodontogramTeethSchema),
    readPeriodontogramTeethController.run,
    refreshTokenController.run
)
router.put(
    '/periodontogram/questions/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateQuestionsSchema),
    updateQuestionsController.run,
    refreshTokenController.run
)
router.put(
    '/periodontogram/mobility/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateMobilitySchema),
    updateMobilityController.run,
    refreshTokenController.run
)
router.put(
    '/periodontogram/furcationInjury/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateFurcationInjurySchema),
    updateFurcationInjuryController.run,
    refreshTokenController.run
)
router.put(
    '/periodontogram/gingivalMargin/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateGingivalMarginSchema),
    updateGingivalMarginController.run,
    refreshTokenController.run
)
router.put(
    '/periodontogram/periodontalPocket/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updatePeriodontalPocketSchema),
    updatePeriodontalPocketController.run,
    refreshTokenController.run
)


export default router