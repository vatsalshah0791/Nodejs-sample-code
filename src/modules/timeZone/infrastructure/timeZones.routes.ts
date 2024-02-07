'use strict'


import { Router } from 'express'

import { readTimeZonesController } from './dependencies'

import { readTimeZonesSchema } from './schemas/readTimeZones.schema'

import { isAuthController, schemaValidator, refreshTokenController } from './shared.import'


const router = Router()


router.get(
    '/timezones/:idCountry',
    isAuthController.run(),
    schemaValidator(readTimeZonesSchema),
    readTimeZonesController.run,
    refreshTokenController.run
)


export default router