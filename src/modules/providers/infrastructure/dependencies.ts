'use strict'

import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import ProviderModel from './models/Provider.model'

import CreateProviderApplication from '../application/CreateProvider.application'
import ReadProvidersApplication from '../application/ReadProviders.application'
import UpdateProviderApplication from '../application/UpdateProvider.application'
import DeleteProviderApplication from '../application/DeleteProvider.application'

import CreateProviderController from './controllers/CreateProvider.controller'
import ReadProvidersController from './controllers/ReadProviders.controller'
import UpdateProviderController from './controllers/UpdateProvider.controller'
import DeleteProviderController from './controllers/DeleteProvider.controller'


const providerModel = new ProviderModel(db, checkSelect, checkInsert)


const createProviderApplication = new CreateProviderApplication(providerModel)
const readProvidersApplication = new ReadProvidersApplication(providerModel)
const updateProviderApplication = new UpdateProviderApplication(providerModel)
const deleteProviderApplication = new DeleteProviderApplication(providerModel)


export const createProviderController = new CreateProviderController(createProviderApplication, errorHandler)
export const readProvidersController = new ReadProvidersController(readProvidersApplication, errorHandler)
export const updateProviderController = new UpdateProviderController(updateProviderApplication, errorHandler)
export const deleteProviderController = new DeleteProviderController(deleteProviderApplication, errorHandler)