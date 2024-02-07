'use strict'


import { Router } from 'express'

import {
    createDentalChairController,
    readDentalChairsController,
    updateDentalChairController,
    deleteDentalChairController
} from './dependencies'

import { createDentalChairSchema } from './schemas/createDentalChair.schema'
import { readDentalChairsSchema } from './schemas/readDentalChairs.schema'
import { updateDentalChairSchema } from './schemas/updateDentalChair.schema'
import { deleteDentalChairSchema } from './schemas/deleteDentalChair.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '12'


router.post(
    '/dentalChairs',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createDentalChairSchema),
    createDentalChairController.run,
    refreshTokenController.run
)
router.get(
    '/dentalChairs/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readDentalChairsSchema),
    readDentalChairsController.run,
    refreshTokenController.run
)
router.put(
    '/dentalChairs/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateDentalChairSchema),
    updateDentalChairController.run,
    refreshTokenController.run
)
router.delete(
    '/dentalChairs/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteDentalChairSchema),
    deleteDentalChairController.run,
    refreshTokenController.run
)


export default router