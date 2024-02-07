'use strict'


import { db, errorHandler, checkSelect, checkInsert, createJwt } from './shared.import'

import TokenModel from './model/Token.model'

import IsAuthApplication from '../application/IsAuth.application'
import RefreshTokenApplication from '../application/RefreshToken.application'

import IsAuthController from './controllers/IsAuth.controller'
import RefreshTokenController from './controllers/RefreshToken.controller'


const tokenModel = new TokenModel(db, checkSelect, checkInsert, createJwt)


const isAuthApplication = new IsAuthApplication(tokenModel)
const refreshTokenApplication = new RefreshTokenApplication(tokenModel)


export const isAuthController = new IsAuthController(isAuthApplication, errorHandler)
export const refreshTokenController = new RefreshTokenController(refreshTokenApplication)