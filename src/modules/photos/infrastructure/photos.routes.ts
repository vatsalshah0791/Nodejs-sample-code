'use strict'


import { Router } from 'express'

import {
    createPhotoController,
    readPhotosController,
    deletePhotoController
} from './dependencies'

import { createPhotoSchema } from './schemas/createPhoto.schema'
import { readPhotosSchema } from './schemas/readPhotos.schema'
import { deletePhotoSchema } from './schemas/deletePhoto.schema'

import {
    isAuthController,
    schemaValidator,
    upload,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '10'


router.post(
    '/photos',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    upload(),
    schemaValidator(createPhotoSchema),
    createPhotoController.run,
    refreshTokenController.run
)
router.get(
    '/photos/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readPhotosSchema),
    readPhotosController.run,
    refreshTokenController.run
)
router.delete(
    '/photos/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(deletePhotoSchema),
    deletePhotoController.run,
    refreshTokenController.run
)


export default router