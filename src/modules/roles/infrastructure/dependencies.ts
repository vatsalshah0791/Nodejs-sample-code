'use strict'


import { db, errorHandler } from './shared.import'

import RoleModel from './models/Role.model'

import ReadRolesAllApplication from '../application/ReadRolesAll.application'
import ReadRolesCollaboratorsApplication from '../application/ReadRolesCollaborators.application'

import ReadRolesAllController from './controllers/ReadRolesAll.controller'
import ReadRolesCollaboratorsController from './controllers/ReadRolesCollaborators.controller'


const roleModel = new RoleModel(db)


const readRolesAllApplication = new ReadRolesAllApplication(roleModel)
const readRolesCollaboratorsApplication = new ReadRolesCollaboratorsApplication(roleModel)


export const readRolesAllController = new ReadRolesAllController(readRolesAllApplication, errorHandler)
export const readRolesCollaboratorsController = new ReadRolesCollaboratorsController(readRolesCollaboratorsApplication, errorHandler)