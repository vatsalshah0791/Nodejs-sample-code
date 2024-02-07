'use strict'


import idValidator from '../../shared/validators/id.validator'

import { db } from '../../../database/connection'

import { checkSelect, checkInsert } from '../../shared/scripts/queryScript.script'
import { getObjectBase64, deleteObject } from '../../shared/objectStorage/s3'

import errorHandler from '../../shared/middlewares/errorHandler.middleware'
import schemaValidator from '../../shared/middlewares/schemaValidator.middleware'
import upload from '../../shared/middlewares/upload.middleware'

import { isAuthController, refreshTokenController } from '../../token/infrastructure/dependencies'
import { canReadController, canWriteController } from '../../permissions/infrastructure/dependencies'

export {
    idValidator,
    db,
    checkSelect,
    checkInsert,
    getObjectBase64,
    deleteObject,
    errorHandler,
    schemaValidator,
    upload,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
}