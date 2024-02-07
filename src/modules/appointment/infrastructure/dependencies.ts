'use strict'

import { db, checkDataAffected, errorHandler, getObjectBase64 } from './shared.import'

import AppointmentModel from './models/Appointment.model'

import CreateAppointmentApplication from '../application/CreateAppointment.application'
import ReadAppointmentApplication from '../application/ReadAppointment.application'
import UpdateAppointmentApplication from '../application/UpdateAppointment.application'
import UpdateStatusApplication from '../application/UpdateStatusAppointment.application'
import ReadAppointmentsByPatientApplication from '../application/ReadAppointmentsByPatient.application'
import ReadAppointmentsByClinicApplication from '../application/ReadAppointmentsByClinic.application'

import CreateAppointmentController from './controllers/CreateAppointment.controller'
import ReadAppointmentController from './controllers/ReadAppointment.controller'
import UpdateAppointmentController from './controllers/UpdateAppointment.controller'
import UpdateStatusController from './controllers/UpdateStatus.controller'
import ReadAppointmentsByPatientController from './controllers/ReadAppointmentsByPatient.controller'
import ReadAppointmentsByClinicController from './controllers/ReadAppointmentByClinic.controller'

const appointmentModel = new AppointmentModel(db, checkDataAffected)

const createAppointmentApplication = new CreateAppointmentApplication(appointmentModel)
const readAppointmentApplication = new ReadAppointmentApplication(appointmentModel, getObjectBase64)
const updateAppointmentApplication = new UpdateAppointmentApplication(appointmentModel)
const updateStatusApplication = new UpdateStatusApplication(appointmentModel)
const readAppointmentsByPatientApplication = new ReadAppointmentsByPatientApplication(appointmentModel, getObjectBase64)
const readAppointmentsByClinicApplication = new ReadAppointmentsByClinicApplication(appointmentModel, getObjectBase64)

export const createAppointmentController = new CreateAppointmentController(createAppointmentApplication, errorHandler)
export const readAppointmentController = new ReadAppointmentController(readAppointmentApplication, errorHandler)
export const updateAppointmentController = new UpdateAppointmentController(updateAppointmentApplication, errorHandler)
export const updateStatusController = new UpdateStatusController(updateStatusApplication, errorHandler)
export const readAppointmentsByPatientController = new ReadAppointmentsByPatientController(readAppointmentsByPatientApplication, errorHandler)
export const readAppointmentsByClinicController = new ReadAppointmentsByClinicController(readAppointmentsByClinicApplication, errorHandler)