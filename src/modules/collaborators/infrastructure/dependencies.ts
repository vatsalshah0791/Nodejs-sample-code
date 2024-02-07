'use strict'


import {
    db,
    SALT,
    checkSelect,
    checkInsert,
    getObjectBase64,
    errorHandler
} from './shared.import'

import CollaboratorModel from './models/Collaborator.model'
import DoctorModel from './models/Doctor.model'
import CollaboratorPayModel from './models/CollaboratorPay.model'

import CreateCollaboratorApplication from '../application/CreateCollaborator.application'
import CreateDoctorApplication from '../application/CreateDoctor.application'
import ReadCollaboratorsApplication from '../application/ReadCollaborators.application'
import ReadCollaboratorApplication from '../application/ReadCollaborator.application'
import ReadCollaboratorAssignedApplication from '../application/ReadCollaboratorsAssigned.application'
import ReadCollaboratorsUnassignedApplication from '../application/ReadCollaboratorsUnassigned.application'
import AssignClinicApplication from '../application/AssignClinic.application'
import CreateCollaboratorPayApplication from '../application/CreateCollaboratorPay.application'
import ReadCollaboratorPaymentsApplication from '../application/ReadCollaboratorPayments.application'

import CreateCollaboratorController from './controllers/CreateCollaborator.controller'
import CreateDoctorController from './controllers/CreateDoctor.controller'
import ReadCollaboratorsController from './controllers/ReadCollaborators.controller'
import ReadDoctorsController from './controllers/ReadDoctors.controller'
import ReadCollaboratorController from './controllers/ReadCollaborator.controller'
import ReadCollaboratorsAssignedController from './controllers/ReadCollaboratorsAssigned.controller'
import ReadDoctorsAssignedController from './controllers/ReadDoctorsAssigned.controller'
import ReadCollaboratorsUnassignedController from './controllers/ReadCollaboratorsUnassigned.controller'
import ReadDoctorsUnassignedController from './controllers/ReadDoctorsUnassigned.controller'
import AssignClinicController from './controllers/AssignClinic.controller'
import CreateCollaboratorPayController from './controllers/CreateCollaboratorPay.controller'
import ReadCollaboratorPaymentsController from './controllers/ReadCollaboratorPayments.controller'


const collaboratorModel = new CollaboratorModel(db, SALT, checkSelect, checkInsert)
const doctorModel = new DoctorModel(db, checkSelect)
const collaboratorPayModel = new CollaboratorPayModel(db, checkSelect, checkInsert)


const createCollaboratorApplication = new CreateCollaboratorApplication(collaboratorModel)
const createDoctorApplication = new CreateDoctorApplication(collaboratorModel, doctorModel)
const readCollaboratorsApplication = new ReadCollaboratorsApplication(collaboratorModel, getObjectBase64)
const readCollaboratorApplication = new ReadCollaboratorApplication(collaboratorModel, getObjectBase64)
const readCollaboratorAssignedApplication = new ReadCollaboratorAssignedApplication(collaboratorModel, getObjectBase64)
const readCollaboratorsUnassignedApplication = new ReadCollaboratorsUnassignedApplication(collaboratorModel, getObjectBase64)
const assignClinicApplication = new AssignClinicApplication(collaboratorModel)

const createCollaboratorPayApplication = new CreateCollaboratorPayApplication(collaboratorPayModel)
const readCollaboratorPaymentsApplication = new ReadCollaboratorPaymentsApplication(collaboratorPayModel)


export const createCollaboratorController = new CreateCollaboratorController(createCollaboratorApplication, errorHandler)
export const createDoctorController = new CreateDoctorController(createDoctorApplication, errorHandler)
export const readCollaboratorsController = new ReadCollaboratorsController(readCollaboratorsApplication, errorHandler)
export const readDoctorsController = new ReadDoctorsController(readCollaboratorsApplication, errorHandler)
export const readCollaboratorController = new ReadCollaboratorController(readCollaboratorApplication, errorHandler)
export const readCollaboratorsAssignedController = new ReadCollaboratorsAssignedController(readCollaboratorAssignedApplication, errorHandler)
export const readDoctorsAssignedController = new ReadDoctorsAssignedController(readCollaboratorAssignedApplication, errorHandler)
export const readCollaboratorsUnassignedController = new ReadCollaboratorsUnassignedController(readCollaboratorsUnassignedApplication, errorHandler)
export const readDoctorsUnassignedController = new ReadDoctorsUnassignedController(readCollaboratorsUnassignedApplication, errorHandler)
export const assignClinicController = new AssignClinicController(assignClinicApplication, errorHandler)

export const createCollaboratorPayController = new CreateCollaboratorPayController(createCollaboratorPayApplication, errorHandler)
export const readCollaboratorPaymentsController = new ReadCollaboratorPaymentsController(readCollaboratorPaymentsApplication, errorHandler)