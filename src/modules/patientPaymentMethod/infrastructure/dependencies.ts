'use strict'


import { db, errorHandler } from './shared.import'

import PatientPaymentMethodModel from './models/PatientPaymentMethod.model'

import ReadPatientPaymentMethodsApplication from '../application/ReadPatientPaymentMethods.application'

import ReadPatientPaymentMethodsController from './controller/ReadPatientPaymentMethods.controller'


const patientPaymentMethodModel = new PatientPaymentMethodModel(db)


const readPatientPaymentMethodsApplication = new ReadPatientPaymentMethodsApplication(patientPaymentMethodModel)


export const readPatientPaymentMethodController = new ReadPatientPaymentMethodsController(readPatientPaymentMethodsApplication, errorHandler)