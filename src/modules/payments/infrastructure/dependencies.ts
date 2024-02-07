'use strict'

import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import PayModel from './models/Pay.model'

import CreatePaymentApplication from '../application/CreatePayment.application'
import ReadPaymentsByPatientsApplication from '../application/ReadPaymentsByPatients.application'
import ReadPaymentsByTreatmentApplication from '../application/ReadPaymentsByTreatments.application'

import CreatePaymentController from './controllers/CreatePayment.controller'
import ReadPaymentsByPatientsController from './controllers/ReadPaymentsByPatient.application'
import ReadPaymentsByTreatmentController from './controllers/ReadPaymentsByTreatment.controller'


const payModel = new PayModel(db, checkSelect, checkInsert)


const createPaymentApplication = new CreatePaymentApplication(payModel)
const readPaymentsByPatientsApplication = new ReadPaymentsByPatientsApplication(payModel)
const readPaymentsByTreatmentApplication = new ReadPaymentsByTreatmentApplication(payModel)


export const createPaymentController = new CreatePaymentController(createPaymentApplication, errorHandler)
export const readPaymentsByPatientsController = new ReadPaymentsByPatientsController(readPaymentsByPatientsApplication, errorHandler)
export const readPaymentsByTreatmentController = new ReadPaymentsByTreatmentController(readPaymentsByTreatmentApplication, errorHandler)