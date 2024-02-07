'use strict'

import { Router } from 'express'

import { readDiscountPlansControllers } from './dependencies'

import { refreshTokenController } from './shared.import'

const router = Router()

router.get(
    '/discountplans',
    readDiscountPlansControllers.run,
    refreshTokenController.run
)

export default router