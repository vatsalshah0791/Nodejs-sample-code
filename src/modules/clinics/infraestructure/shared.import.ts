'use strict'


import idValidator from '../../shared/validators/id.validator'
import phonePrefixValidator from '../../shared/validators/phonePrefix.validator'
import phoneNumberValidator from '../../shared/validators/phoneNumber.validator'

import { db } from '../../../database/connection'

import { checkSelect, checkInsert } from '../../shared/scripts/queryScript.script'

import { getObjectBase64, deleteObject } from '../../shared/objectStorage/s3'

import errorHandler from '../../shared/middlewares/errorHandler.middleware'
import schemaValidator from '../../shared/middlewares/schemaValidator.middleware'
import isAdmin from '../../shared/middlewares/isAdmin.middleware'
import isCollaborator from '../../shared/middlewares/isCollaborator.middleware'
import noPatients from '../../shared/middlewares/noPatients.middleware'
import upload from '../../shared/middlewares/upload.middleware'

import { isAuthController, refreshTokenController } from '../../token/infrastructure/dependencies'


export {
    idValidator,
    phonePrefixValidator,
    phoneNumberValidator,
    db,
    checkSelect,
    checkInsert,
    getObjectBase64,
    deleteObject,
    errorHandler,
    schemaValidator,
    isAdmin,
    isCollaborator,
    noPatients,
    upload,
    isAuthController,
    refreshTokenController
}