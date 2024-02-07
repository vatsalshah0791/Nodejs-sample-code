'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import DentalChairModel from './models/DentalChair.model'

import CreateDentalChairApplication from '../application/CreateDentalChair.application'
import ReadDentalChairsApplication from '../application/ReadDentalChairs.application'
import UpdateDentalChairApplication from '../application/UpdateDentalChair.application'
import DeleteDentalChairApplication from '../application/DeleteDentalChair.application'

import CreateDentalChairController from './controllers/CreateDentalChair.controller'
import ReadDentalChairsController from './controllers/ReadDentalChairs.controller'
import UpdateDentalChairController from './controllers/UpdateDentalChair.controller'
import DeleteDentalChairController from './controllers/deleteDentalChair.controller'


const dentalChairModel = new DentalChairModel(db, checkSelect, checkInsert)


const createDentalChairApplication = new CreateDentalChairApplication(dentalChairModel)
const readDentalChairsApplication = new ReadDentalChairsApplication(dentalChairModel)
const updateDentalChairApplication = new UpdateDentalChairApplication(dentalChairModel)
const deleteDentalChairApplication = new DeleteDentalChairApplication(dentalChairModel)


export const createDentalChairController = new CreateDentalChairController(createDentalChairApplication, errorHandler)
export const readDentalChairsController = new ReadDentalChairsController(readDentalChairsApplication, errorHandler)
export const updateDentalChairController = new UpdateDentalChairController(updateDentalChairApplication, errorHandler)
export const deleteDentalChairController = new DeleteDentalChairController(deleteDentalChairApplication, errorHandler)