'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import PeriodontogramModel from './models/Periodontogram.model'

import ReadPeriodontogramApplication from '../application/ReadPeriodontogram.application'
import ReadPeriodontogramTeethApplication from '../application/ReadPeriodontogramTeeth.application'
import UpdateQuestionsApplication from '../application/UpdateQuestions.application'
import UpdateMobilityApplication from '../application/UpdateMobility.application'
import UpdateFurcationInjuryApplication from '../application/UpdateFurcationInjury.application'
import UpdateGingivalMarginApplication from '../application/UpdateGingivalMargin.application'
import UpdatePeriodontalPocketApplication from '../application/UpdatePeriodontalPocket.application'

import ReadPeriodontogramController from './controllers/ReadPeriodontogram.controller'
import ReadPeriodontogramTeethController from './controllers/ReadPeriodontogramTeeth.controller'
import UpdateQuestionsController from './controllers/UpdateQuestions.controller'
import UpdateMobilityController from './controllers/UpdateMobility.controller'
import UpdateFurcationInjuryController from './controllers/UpdateFurcationInjury.controller'
import UpdateGingivalMarginController from './controllers/UpdateGingivalMargin.controller'
import UpdatePeriodontalPocketController from './controllers/UpdatePeriodontalPocket.controller'


const periodontogramModel = new PeriodontogramModel(db, checkSelect, checkInsert)


const readPeriodontogramApplication = new ReadPeriodontogramApplication(periodontogramModel)
const readPeriodontogramTeethApplication = new ReadPeriodontogramTeethApplication(periodontogramModel)
const updateQuestionsApplication = new UpdateQuestionsApplication(periodontogramModel)
const updateMobilityApplication = new UpdateMobilityApplication(periodontogramModel)
const updateFurcationInjuryApplication = new UpdateFurcationInjuryApplication(periodontogramModel)
const updateGingivalMarginApplication = new UpdateGingivalMarginApplication(periodontogramModel)
const updatePeriodontalPocketApplication = new UpdatePeriodontalPocketApplication(periodontogramModel)


export const readPeriodontogramController = new ReadPeriodontogramController(readPeriodontogramApplication, errorHandler)
export const readPeriodontogramTeethController = new ReadPeriodontogramTeethController(readPeriodontogramTeethApplication, errorHandler)
export const updateQuestionsController = new UpdateQuestionsController(updateQuestionsApplication, errorHandler)
export const updateMobilityController = new UpdateMobilityController(updateMobilityApplication, errorHandler)
export const updateFurcationInjuryController = new UpdateFurcationInjuryController(updateFurcationInjuryApplication, errorHandler)
export const updateGingivalMarginController = new UpdateGingivalMarginController(updateGingivalMarginApplication, errorHandler)
export const updatePeriodontalPocketController = new UpdatePeriodontalPocketController(updatePeriodontalPocketApplication, errorHandler)