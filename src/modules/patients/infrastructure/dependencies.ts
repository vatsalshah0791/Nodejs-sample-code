'use strict'


import {
    db,
    SALT,
    checkSelect,
    checkInsert,
    getObjectBase64,
    deleteObject,
    errorHandler
} from './shared.import'

import PatientModel from './models/Patient.model'

import CreatePatientApplication from '../application/CreatePatient.application'
import ReadPatientApplication from '../application/ReadPatient.application'
import ReadPatientsApplication from '../application/ReadPatients.application'
import ReadPatientsStatisticsApplication from '../application/ReadPatientsStatistics.application'
import UpdatePatientApplication from '../application/UpdatePatient.application'
import UpdatePhotoApplication from '../application/UpdatePhoto.application'

import CreatePatientController from './controllers/CreatePatient.controller'
import ReadPatientController from './controllers/ReadPatient.controller'
import ReadPatientsController from './controllers/ReadPatients.controller'
import ReadPatientsStatisticsController from './controllers/readPatientsStatistics.controller'
import UpdatePatientController from './controllers/UpdatePatient.controller'
import UpdatePhotoController from './controllers/UpdatePhoto.controller'


const patientModel = new PatientModel(db, SALT, checkSelect, checkInsert)


const createPatientApplication = new CreatePatientApplication(patientModel)
const readPatientApplication = new ReadPatientApplication(patientModel, getObjectBase64)
const readPatientsApplication = new ReadPatientsApplication(patientModel, getObjectBase64)
const readPatientsStatisticsApplication = new ReadPatientsStatisticsApplication(patientModel)
const updatePatientApplication = new UpdatePatientApplication(patientModel)
const updatePhotoApplication = new UpdatePhotoApplication(patientModel, deleteObject)


export const createPatientController = new CreatePatientController(createPatientApplication, errorHandler)
export const readPatientController = new ReadPatientController(readPatientApplication, errorHandler)
export const readPatientsController = new ReadPatientsController(readPatientsApplication, errorHandler)
export const readPatientsStatisticsController = new ReadPatientsStatisticsController(readPatientsStatisticsApplication, errorHandler)
export const updatePatientController = new UpdatePatientController(updatePatientApplication, errorHandler)
export const updatePhotoController = new UpdatePhotoController(updatePhotoApplication, errorHandler)