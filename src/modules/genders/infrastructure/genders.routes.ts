'use strict'


import { Router } from 'express'

import { readGendersController } from './dependencies'

import { refreshTokenController } from './shared.import'


const router = Router()


router.get(
    '/genders',
    readGendersController.run,
    refreshTokenController.run
)


export default router