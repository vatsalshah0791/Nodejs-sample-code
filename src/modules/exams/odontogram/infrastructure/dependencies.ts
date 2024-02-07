'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import OdontogramModel from './models/Odontogram.model'

import ReadOdontogramApplication from '../application/ReadOdontogram.application'
import ReadOdontogramTeethApplication from '../application/ReadOdontogramTeeth.application'
import UpdateQuestionsApplication from '../application/UpdateQuestions.application'
import UpdateGeneralOdontologyApplication from '../application/UpdateGeneralOdontology.application'
import UpdateProsthesisApplication from '../application/UpdateProsthesis.application'
import UpdateProsthesisMultilineApplication from '../application/UpdateProsthesisMultiline.application'
import UpdateEndodonticsApplication from '../application/UpdateEndodontics.application'
import UpdateOrthodonticsApplication from '../application/UpdateOrthodontics.application'

import ReadOdontogramController from './controllers/ReadOdontogram.controller'
import ReadOdontogramTeethController from './controllers/ReadOdontogramTeeth.controller'
import UpdateQuestionsController from './controllers/UpdateQuestions.controller'
import UpdateGeneralOdontologyController from './controllers/UpdateGeneralOdontology.controller'
import UpdateProsthesisController from './controllers/UpdateProsthesis.controller'
import UpdateProsthesisMultilineController from './controllers/UpdateProsthesisMultiline.controller'
import UpdateEndodonticsController from './controllers/UpdateEndodontics.controller'
import UpdateOrthodonticsController from './controllers/UpdateOrthodontics.controller'


const odontogramModel = new OdontogramModel(db, checkSelect, checkInsert)


const readOdontogramApplication = new ReadOdontogramApplication(odontogramModel)
const readOdontogramTeethApplication = new ReadOdontogramTeethApplication(odontogramModel)
const updateQuestionsApplication = new UpdateQuestionsApplication(odontogramModel)
const updateGeneralOdontologyApplication = new UpdateGeneralOdontologyApplication(odontogramModel)
const updateProsthesisApplication = new UpdateProsthesisApplication(odontogramModel)
const updateProsthesisMultilineApplication = new UpdateProsthesisMultilineApplication(odontogramModel)
const updateEndodonticsApplication = new UpdateEndodonticsApplication(odontogramModel)
const updateOrthodonticsApplication = new UpdateOrthodonticsApplication(odontogramModel)


export const readOdontogramController = new ReadOdontogramController(readOdontogramApplication, errorHandler)
export const readOdontogramTeethController = new ReadOdontogramTeethController(readOdontogramTeethApplication, errorHandler)
export const updateQuestionsController = new UpdateQuestionsController(updateQuestionsApplication, errorHandler)
export const updateGeneralOdontologyController = new UpdateGeneralOdontologyController(updateGeneralOdontologyApplication, errorHandler)
export const updateProsthesisController = new UpdateProsthesisController(updateProsthesisApplication, errorHandler)
export const updateProsthesisMultilineController = new UpdateProsthesisMultilineController(updateProsthesisMultilineApplication, errorHandler)
export const updateEndodonticsController = new UpdateEndodonticsController(updateEndodonticsApplication, errorHandler)
export const updateOrthodonticsController = new UpdateOrthodonticsController(updateOrthodonticsApplication, errorHandler)