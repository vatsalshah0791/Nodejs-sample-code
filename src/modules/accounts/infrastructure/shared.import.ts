'use strict'


import idValidator from '../../shared/validators/id.validator'
import phonePrefixValidator from '../../shared/validators/phonePrefix.validator'
import phoneNumberValidator from '../../shared/validators/phoneNumber.validator'

import { db } from '../../../database/connection'

import SALT from '../../shared/constants/SALT'

import { checkSelect, checkInsert } from '../../shared/scripts/queryScript.script'
import createJwt from '../../shared/scripts/createJwt.script'

import upload from '../../shared/middlewares/upload.middleware'

import { getObjectBase64, deleteObject } from '../../shared/objectStorage/s3'

import errorHandler from '../../shared/middlewares/errorHandler.middleware'
import isAdmin from '../../shared/middlewares/isAdmin.middleware'
import isCollaborator from '../../shared/middlewares/isCollaborator.middleware'
import noPatients from '../../shared/middlewares/noPatients.middleware'
import schemaValidator from '../../shared/middlewares/schemaValidator.middleware'

import { isAuthController, refreshTokenController } from '../../token/infrastructure/dependencies'


export {
    idValidator,
    phonePrefixValidator,
    phoneNumberValidator,
    db,
    SALT,
    checkSelect,
    checkInsert,
    createJwt,
    upload,
    getObjectBase64,
    deleteObject,
    errorHandler,
    isAdmin,
    isCollaborator,
    noPatients,
    schemaValidator,
    isAuthController,
    refreshTokenController
}