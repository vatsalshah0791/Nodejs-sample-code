'use strict'


import { Router } from 'express'

import { readCurrenciesController } from './dependencies'

import { isAuthController, refreshTokenController } from './shared.import'


const router = Router()


router.get(
    '/currencies',
    isAuthController.run(),
    readCurrenciesController.run,
    refreshTokenController.run
)


export default router