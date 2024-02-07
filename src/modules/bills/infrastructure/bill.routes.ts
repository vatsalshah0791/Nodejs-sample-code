'use strict'

import { Router } from 'express'

import {
    createBillController,
    readBillByDateController,
    readBillController
} from './dependencies'

import { createBillSchema } from './schemas/createBill.schema'
import { readByDateSchema } from './schemas/readByDate.schema'
import { readBillSchema } from './schemas/readBill.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canWriteController,
    canReadController
} from './shared.import'

const router = Router()
const idSection = '3'

router.post(
    '/bills',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createBillSchema),
    createBillController.run,
    refreshTokenController.run
)
router.post(
    '/bills/byDate',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readByDateSchema),
    readBillByDateController.run,
    refreshTokenController.run
)
router.get(
    '/bills/:id',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readBillSchema),
    readBillController.run,
    refreshTokenController.run
)

export default router