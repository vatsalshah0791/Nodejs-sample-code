'use strict'


import { db, checkSelect, checkInsert, getObjectBase64, deleteObject, errorHandler } from './shared.import'

import ClinicModel from './models/Clinic.model'

import CreateClinicApplication from '../application/CreateClinic.application'
import ReadClinicApplication from '../application/ReadClinic.application'
import ReadClinicsByAdminApplication from '../application/ReadClinicsByAdmin.application'
import ReadClinicsByCollaboratorApplication from '../application/ReadClinicsByCollaborator.application'
import ReadStaffStatisticsApplication from '../application/ReadStaffStatistics.application'
import UpdateClinicApplication from '../application/UpdateClinic.application'
import UpdateLogoApplication from '../application/UpdateLogo.application'

import CreateClinicController from './controllers/CreateClinic.controller'
import ReadClinicController from './controllers/ReadClinic.controller'
import ReadClinicsByAdminController from './controllers/ReadClinicsByAdmin.controller'
import ReadClinicsByCollaboratorController from './controllers/ReadClinicsByCollaborator.controller'
import ReadStaffStatisticsController from './controllers/ReadStaffStatistics.controller'
import UpdateClinicController from './controllers/UpdateClinic.controller'
import UpdateLogoController from './controllers/UpdateLogo.controller'


const clinicModel = new ClinicModel(db, checkSelect, checkInsert)


const createClinicApplication = new CreateClinicApplication(clinicModel)
const readClinicApplication = new ReadClinicApplication(clinicModel, getObjectBase64)
const readClinicsByAdminApplication = new ReadClinicsByAdminApplication(clinicModel, getObjectBase64)
const readClinicsByCollaboratorApplication = new ReadClinicsByCollaboratorApplication(clinicModel, getObjectBase64)
const readStaffStatisticsApplication = new ReadStaffStatisticsApplication(clinicModel)
const updateClinicApplication = new UpdateClinicApplication(clinicModel)
const updateLogoApplication = new UpdateLogoApplication(clinicModel, deleteObject)


export const createClinicController = new CreateClinicController(createClinicApplication, errorHandler)
export const readClinicController = new ReadClinicController(readClinicApplication, errorHandler)
export const readClinicsByAdminController = new ReadClinicsByAdminController(readClinicsByAdminApplication, errorHandler)
export const readClinicsByCollaboratorController = new ReadClinicsByCollaboratorController(readClinicsByCollaboratorApplication, errorHandler)
export const readStaffStatisticsController = new ReadStaffStatisticsController(readStaffStatisticsApplication, errorHandler)
export const updateClinicController = new UpdateClinicController(updateClinicApplication, errorHandler)
export const updateLogoController = new UpdateLogoController(updateLogoApplication, deleteObject)