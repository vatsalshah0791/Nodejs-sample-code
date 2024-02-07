'use strict'

import { Router } from 'express'

import {
    readInventoryByMonthController,
    readInventoryByYearController,
    readInventoryController,
    updateStockController
} from './dependencies'

import { readInventoryMonthSchema } from './schemas/readInventoryMonth.schema'
import { readInventoryYearSchema } from './schemas/readInventoryYear.schema'
import { readInventorySchema } from './schemas/readInventory.schema'
import { updateStockSchema } from './schemas/updateStock.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'

const router = Router()
const idSection = '3'

router.post(
    '/inventory/month',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readInventoryMonthSchema),
    readInventoryByMonthController.run,
    refreshTokenController.run
)
router.post(
    '/inventory/year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readInventoryYearSchema),
    readInventoryByYearController.run,
    refreshTokenController.run
)
router.get(
    '/inventory/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readInventorySchema),
    readInventoryController.run,
    refreshTokenController.run
)
router.put(
    '/inventory/stock/:idStock',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateStockSchema),
    updateStockController.run,
    refreshTokenController.run
)

export default router