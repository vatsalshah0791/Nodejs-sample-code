'use strict'


import { Router } from 'express'

import { readLanguagesController } from './dependencies'

import { isAuthController, refreshTokenController } from './shared.import'


const router = Router()


router.get(
    '/languages',
    isAuthController.run(),
    readLanguagesController.run,
    refreshTokenController.run
)


export default router