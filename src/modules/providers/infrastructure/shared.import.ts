'use strict'


import idValidator from '../../shared/validators/id.validator'
import phonePrefixValidator from '../../shared/validators/phonePrefix.validator'
import phoneNumberValidator from '../../shared/validators/phoneNumber.validator'

import { db } from '../../../database/connection'

import { checkSelect, checkInsert } from '../../shared/scripts/queryScript.script'

import errorHandler from '../../shared/middlewares/errorHandler.middleware'
import schemaValidator from '../../shared/middlewares/schemaValidator.middleware'

import { isAuthController, refreshTokenController } from '../../token/infrastructure/dependencies'
import { canReadController, canWriteController } from '../../permissions/infrastructure/dependencies'


export {
    idValidator,
    phonePrefixValidator,
    phoneNumberValidator,
    db,
    checkSelect,
    checkInsert,
    errorHandler,
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
}