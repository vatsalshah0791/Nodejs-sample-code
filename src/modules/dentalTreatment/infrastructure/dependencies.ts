'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import DentalTreatmentModel from './models/DentalTreatment.model'

import CreateDentalTreatmentApplication from '../application/CreateDentalTreatment.application'
import ReadDentalTreatmentsApplication from '../application/ReadDentalTreatments.application'
import UpdateDentalTreatmentAppliation from '../application/UpdateDentalTreatment.application'
import DeleteDentalTreatmentApplication from '../application/DeleteDentalTreatment.application'

import CreateDentalTreatmentController from './controllers/CreateDentalTreatment.controller'
import ReadDentalTreatmentsController from './controllers/ReadDentalTreatments.controller'
import UpdateDentalTreatmentController from './controllers/UpdateDentalTreatment.controller'
import DeleteDentalTreatmentController from './controllers/DeleteDentalTreatment.controller'


const dentalTreatmentModel = new DentalTreatmentModel(db, checkSelect, checkInsert)


const createDentalTreatmentApplication = new CreateDentalTreatmentApplication(dentalTreatmentModel)
const readDentalTreatmentsApplication = new ReadDentalTreatmentsApplication(dentalTreatmentModel)
const updateDentalTreatmentAppliation = new UpdateDentalTreatmentAppliation(dentalTreatmentModel)
const deleteDentalTreatmentApplication = new DeleteDentalTreatmentApplication(dentalTreatmentModel)


export const createDentalTreatmentController = new CreateDentalTreatmentController(createDentalTreatmentApplication, errorHandler)
export const readDentalTreatmentsController = new ReadDentalTreatmentsController(readDentalTreatmentsApplication, errorHandler)
export const updateDentalTreatmentController = new UpdateDentalTreatmentController(updateDentalTreatmentAppliation, errorHandler)
export const deleteDentalTreatmentController = new DeleteDentalTreatmentController(deleteDentalTreatmentApplication, errorHandler)