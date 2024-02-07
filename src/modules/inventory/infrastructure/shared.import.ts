'use strict'

import idValidator from '../../shared/validators/id.validator'
import floatStringValidator from '../../shared/validators/floatString.validator'
import { formatDate } from '../../shared/scripts/queryResult2.script'
import timeValidator from '../../shared/validators/time.validator'

import { db } from '../../../database/connection'

import { checkDataExists, checkDataAffected } from '../../shared/scripts/queryResult2.script'

import { getObjectBase64, deleteObject } from '../../shared/objectStorage/s3'

import errorHandler from '../../shared/middlewares/errorHandler.middleware'
import schemaValidator from '../../shared/middlewares/schemaValidator.middleware'
import isAdmin from '../../shared/middlewares/isAdmin.middleware'
import upload from '../../shared/middlewares/upload.middleware'

import { isAuthController, refreshTokenController } from '../../token/infrastructure/dependencies'
import { canWriteController, canReadController } from '../../permissions/infrastructure/dependencies'

export {
    idValidator,
    //floatStringValidator,
    //formatDate,
    //timeValidator,
    db,
    //checkDataExists,
    checkDataAffected,
    //getObjectBase64,
    //deleteObject,
    errorHandler,
    schemaValidator,
    //isAdmin,
    //upload,
    isAuthController,
    refreshTokenController,
    canWriteController,
    canReadController
}