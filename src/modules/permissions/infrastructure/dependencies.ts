'use strict'


import { db, checkSelect, checkInsert, errorHandler } from './shared.import'

import PermissionModel from './models/Permission.model'

import CanReadApplication from '../application/CanRead.application'
import CanWriteApplication from '../application/CanWrite.application'
import AdminReadPermissionsApplication from '../application/AdminReadPermissions.application'
import CollaboratorReadPermissionsApplication from '../application/CollaboratorReadPermissions.application'
import UpdatePermissionApplication from '../application/UpdatePermission.application'

import CanReadController from './controllers/CanRead.controller'
import CanWriteController from './controllers/CanWrite.controller'
import AdminReadPermissionsController from './controllers/AdminReadPermissions.controller'
import CollaboratorReadPermissionsController from './controllers/CollaboratorReadPermissions.controller'
import UpdatePermissionController from './controllers/UpdatePermission.controller'


const permissionModel = new PermissionModel(db, checkSelect, checkInsert)


const canReadApplication = new CanReadApplication(permissionModel)
const canWriteApplication = new CanWriteApplication(permissionModel)
const adminReadPermissionsApplication = new AdminReadPermissionsApplication(permissionModel)
const collaboratorReadPermissionsApplication = new CollaboratorReadPermissionsApplication(permissionModel)
const updatePermissionApplication = new UpdatePermissionApplication(permissionModel)


export const canReadController = new CanReadController(canReadApplication, errorHandler)
export const canWriteController = new CanWriteController(canWriteApplication, errorHandler)
export const adminReadPermissionsController = new AdminReadPermissionsController(adminReadPermissionsApplication, errorHandler)
export const collaboratorReadPermissionsController = new CollaboratorReadPermissionsController(collaboratorReadPermissionsApplication, errorHandler)
export const updatePermissionController = new UpdatePermissionController(updatePermissionApplication, errorHandler)