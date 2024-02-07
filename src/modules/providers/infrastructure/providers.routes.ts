'use strict'


import { Router } from 'express'

import {
    createProviderController,
    readProvidersController,
    updateProviderController,
    deleteProviderController
} from './dependencies'

import { createProviderSchema } from './schemas/createProvider.schema'
import { readProvidersSchema } from './schemas/readProviders.schema'
import { updateProviderSchema } from './schemas/updateProvider.schema'
import { deleteProviderSchema } from './schemas/deleteProvider.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '15'


router.post(
    '/providers',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createProviderSchema),
    createProviderController.run,
    refreshTokenController.run
)
router.get(
    '/providers/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readProvidersSchema),
    readProvidersController.run,
    refreshTokenController.run
)
router.put(
    '/providers/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateProviderSchema),
    updateProviderController.run,
    refreshTokenController.run
)
router.delete(
    '/providers/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteProviderSchema),
    deleteProviderController.run,
    refreshTokenController.run
)


export default router