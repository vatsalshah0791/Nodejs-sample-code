'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import RecordModel from './models/Record.model'

import ReadRecordApplication from '../application/ReadRecord.application'
import UpdateDentalHistoryNotesApplication from '../application/UpdateDentalHistoryNotes.application'
import UpdateMedicalHistoryNotesApplication from '../application/UpdateMedicalHistoryNotes.application'
import UpdateRecordApplication from '../application/UpdateRecord.application'

import ReadRecordController from './controllers/ReadRecord.controller'
import UpdateDentalHistoryNotesController from './controllers/UpdateDentalHistoryNotes.controller'
import UpdateMedicalHistoryNotesController from './controllers/UpdateMedicalHistoryNotes.controller'
import UpdateRecordController from './controllers/UpdateRecord.controller'


const recordModel = new RecordModel(db, checkSelect, checkInsert)


const readRecordApplication = new ReadRecordApplication(recordModel)
const updateDentalHistoryNotesApplication = new UpdateDentalHistoryNotesApplication(recordModel)
const updateMedicalHistoryNotesApplication = new UpdateMedicalHistoryNotesApplication(recordModel)
const updateRecordApplication = new UpdateRecordApplication(recordModel)


export const readRecordController = new ReadRecordController(readRecordApplication, errorHandler)
export const updateDentalHistoryNotesController = new UpdateDentalHistoryNotesController(updateDentalHistoryNotesApplication, errorHandler)
export const updateMedicalHistoryNotesController = new UpdateMedicalHistoryNotesController(updateMedicalHistoryNotesApplication, errorHandler)
export const updateRecordController = new UpdateRecordController(updateRecordApplication, errorHandler)