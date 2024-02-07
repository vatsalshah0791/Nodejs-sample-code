'use strict'


import idValidator from '../../shared/validators/id.validator'
import phonePrefixValidator from '../../shared/validators/phonePrefix.validator'
import phoneNumberValidator from '../../shared/validators/phoneNumber.validator'

import { db } from '../../../database/connection'

import SALT from '../../shared/constants/SALT'

import { checkSelect, checkInsert } from '../../shared/scripts/queryScript.script'

import { getObjectBase64, deleteObject } from '../../shared/objectStorage/s3'

import errorHandler from '../../shared/middlewares/errorHandler.middleware'
import upload from '../../shared/middlewares/upload.middleware'
import schemaValidator from '../../shared/middlewares/schemaValidator.middleware'

import { isAuthController, refreshTokenController } from '../../token/infrastructure/dependencies'
import { canReadController, canWriteController } from '../../permissions/infrastructure/dependencies'


export {
    idValidator,
    phonePrefixValidator,
    phoneNumberValidator,
    db,
    SALT,
    checkSelect,
    checkInsert,
    getObjectBase64,
    deleteObject,
    errorHandler,
    upload,
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
}