'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import AtmModel from './model/Atm.model'

import ReadAtmApplication from '../application/ReadAtm.application'
import UpdateExamNotesApplication from '../application/UpdateExamNotes.application'
import UpdateAtmApplication from '../application/UpdateAtm.application'
import UpdateAtmMultilineApplication from '../application/UpdateAtmMultiline.application'

import ReadAtmController from './controller/ReadAtm.controller'
import UpdateExamNotesController from './controller/UpdateExamNotes.controller'
import UpdateAtmController from './controller/UpdateAtm.controller'
import UpdateAtmMultilineController from './controller/UpdateAtmMultiline.controller'


const atmModel = new AtmModel(db, checkSelect, checkInsert)


const readAtmApplication = new ReadAtmApplication(atmModel)
const updateExamNotesApplication = new UpdateExamNotesApplication(atmModel)
const updateAtmApplication = new UpdateAtmApplication(atmModel)
const updateAtmMultilineApplication = new UpdateAtmMultilineApplication(atmModel)


export const readAtmController = new ReadAtmController(readAtmApplication, errorHandler)
export const updateExamNotesController = new UpdateExamNotesController(updateExamNotesApplication, errorHandler)
export const updateAtmController = new UpdateAtmController(updateAtmApplication, errorHandler)
export const updateAtmMultilineController = new UpdateAtmMultilineController(updateAtmMultilineApplication, errorHandler)