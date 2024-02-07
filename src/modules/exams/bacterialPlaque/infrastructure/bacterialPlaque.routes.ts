'use strict'


import { Router } from 'express'

import {
    readBacterialPlaqueController,
    updateIsAdultController,
    updateBacterialPlaqueController,
} from './dependencies'

import { readReadBactrialPlaqueSchema } from './schemas/readBacterialPlaque.schema'
import { updateIsAdultSchema } from './schemas/updateIsAdult.schema'
import { updateBacterialplaqueSchema } from './schemas/updateBacterialPlaque.schema'

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
    '/bacterialPlaque/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readReadBactrialPlaqueSchema),
    readBacterialPlaqueController.run,
    refreshTokenController.run
)
router.put(
    '/bacterialPlaque/:id/updateIsAdult',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateIsAdultSchema),
    updateIsAdultController.run,
    refreshTokenController.run
)
router.put(
    '/bacterialPlaque/:id/:key',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateBacterialplaqueSchema),
    updateBacterialPlaqueController.run,
    refreshTokenController.run
)


export default router