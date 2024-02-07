'use strict'


import { db, errorHandler } from './shared.import'

import ProviderTypeModel from './models/ProviderType.model'

import ReadProviderTypeApplication from '../application/ReadProviderType.application'

import ReadProviderTypeController from './controllers/ReadProviderType.controller'


const providerTypeModel = new ProviderTypeModel(db)


const readProviderTypeApplication = new ReadProviderTypeApplication(providerTypeModel)


export const readProviderTypeController = new ReadProviderTypeController(readProviderTypeApplication, errorHandler)