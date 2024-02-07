'use strict'


import { Router } from 'express'

import {
    createProductController,
    readProductsController,
    updateProductController,
    deleteProductController
} from './dependencies'

import { createProducSchema } from './schemas/createProduct.schema'
import { readProductsSchema } from './schemas/readProducts.schema'
import { updateProductSchema } from './schemas/updateProduct.schema'
import { deleteProductSchema } from './schemas/deleteProduc.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '16'


router.post(
    '/products',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createProducSchema),
    createProductController.run,
    refreshTokenController.run
)
router.get(
    '/products/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readProductsSchema),
    readProductsController.run,
    refreshTokenController.run
)
router.put(
    '/products/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateProductSchema),
    updateProductController.run,
    refreshTokenController.run
)
router.delete(
    '/products/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deleteProductSchema),
    deleteProductController.run,
    refreshTokenController.run
)


export default router