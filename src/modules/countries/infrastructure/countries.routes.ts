'use strict'


import { Router } from 'express'

import { readCountriesController } from './dependencies'

import { refreshTokenController } from './shared.import'


const router = Router()


router.get(
    '/countries',
    readCountriesController.run,
    refreshTokenController.run
)


export default router