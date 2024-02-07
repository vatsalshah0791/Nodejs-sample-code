'use strict'


import { Router } from 'express'

import { readProviderTypeController } from './dependencies'

import {
    isAuthController,
    refreshTokenController
} from './shared.import'


const router = Router()


router.get(
    '/providerTypes',
    isAuthController.run(),
    readProviderTypeController.run,
    refreshTokenController.run
)


export default router