'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import OrthodonticsModel from './model/Orthodontics.model'

import ReadOrthodonticsApplication from '../application/ReadOrthodontics.application'
import UpdateExamNotesApplication from '../application/UpdateExamNotes.application'
import UpdateOrthodonticsApplication from '../application/UpdateOrthodontics.application'
import UpdateOverbiteHorizontalApplication from '../application/UpdateOverbiteHorizontal.application'
import UpdateOverbiteVerticalApplication from '../application/UpdateOverbiteVertical.application'
import UpdateMiddleLineApplication from '../application/UpdateMiddleLine.application'

import ReadOrthodonticsController from './controller/ReadOrthodontics.controller'
import UpdateExamNotesController from './controller/UpdateExamNotes.controller'
import UpdateOrthodonticsController from './controller/UpdateOrthodontics.controller'
import UpdateOverbiteHorizontalController from './controller/UpdateOverbiteHorizontal.controller'
import UpdateOverbiteVerticalController from './controller/UpdateOverbiteVertical.controller'
import UpdateMiddleLineController from './controller/UpdateMiddleLine.controller'


const orthodonticsModel = new OrthodonticsModel(db, checkSelect, checkInsert)


const readOrthodonticsApplication = new ReadOrthodonticsApplication(orthodonticsModel)
const updateExamNotesApplication = new UpdateExamNotesApplication(orthodonticsModel)
const updateOrthodonticsApplication = new UpdateOrthodonticsApplication(orthodonticsModel)
const updateOverbiteHorizontalApplication = new UpdateOverbiteHorizontalApplication(orthodonticsModel)
const updateOverbiteVerticalApplication = new UpdateOverbiteVerticalApplication(orthodonticsModel)
const updateMiddleLineApplication = new UpdateMiddleLineApplication(orthodonticsModel)


export const readOrthodonticsController = new ReadOrthodonticsController(readOrthodonticsApplication, errorHandler)
export const updateExamNotesController = new UpdateExamNotesController(updateExamNotesApplication, errorHandler)
export const updateOrthodonticsController = new UpdateOrthodonticsController(updateOrthodonticsApplication, errorHandler)
export const updateOverbiteHorizontalController = new UpdateOverbiteHorizontalController(updateOverbiteHorizontalApplication, errorHandler)
export const updateOverbiteVerticalController = new UpdateOverbiteVerticalController(updateOverbiteVerticalApplication, errorHandler)
export const updateMiddleLineController = new UpdateMiddleLineController(updateMiddleLineApplication, errorHandler)