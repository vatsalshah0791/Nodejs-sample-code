'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import EndodonticsModel from './models/Endodontics.models'

import ReadEndodonticsApplication from '../application/ReadEndodontics.application'
import ReadEndodonticsTeethApplication from '../application/ReadEndodonticsTeeth.application'
import UpdateExamNotesApplication from '../application/UpdateExamNotes.application'
import UpdatePainApplication from '../application/UpdatePain.application'
import UpdateClinicalExaminationApplication from '../application/UpdateClinicalExamination.application'
import UpdateClinicalExaminationMultilineApplication from '../application/UpdateClinicalExaminationMultiline.application'
import UpdateXRaysApplication from '../application/UpdateXRays.application'
import UpdateSensitivityTestApplication from '../application/UpdateSensitivityTest.application'
import UpdateDiagnosisApplication from '../application/UpdateDiagnosis.application'
import UpdateDuctsApplication from '../application/UpdateDucts.application'

import ReadEndodonticsController from './controllers/ReadEndodontics.controller'
import ReadEndodonticsTeethController from './controllers/ReadEndodonticsTeeth.controller'
import UpdateExamNotesController from './controllers/UpdateExamNotes.controller'
import UpdatePainController from './controllers/UpdatePain.controller'
import UpdateClinicalExaminationController from './controllers/UpdateClinicalExamination.controller'
import UpdateClinicalExaminationMultilineController from './controllers/UpdateClinicalExaminationMultiline.controller'
import UpdateXRaysController from './controllers/UpdateXRays.controller'
import UpdateSensitivityTestController from './controllers/UpdateSensitivityTest.controller'
import UpdateDiagnosisController from './controllers/UpdateDiagnosis.controller'
import UpdateDuctsController from './controllers/UpdateDucts.controller'


const endodonticsModel = new EndodonticsModel(db, checkSelect, checkInsert)


const readEndodonticsApplication = new ReadEndodonticsApplication(endodonticsModel)
const readEndodonticsTeethApplication = new ReadEndodonticsTeethApplication(endodonticsModel)
const updateExamNotesApplication = new UpdateExamNotesApplication(endodonticsModel)
const updatePainApplication = new UpdatePainApplication(endodonticsModel)
const updateClinicalExaminationApplication = new UpdateClinicalExaminationApplication(endodonticsModel)
const updateClinicalExaminationMultilineApplication = new UpdateClinicalExaminationMultilineApplication(endodonticsModel)
const updateXRaysApplication = new UpdateXRaysApplication(endodonticsModel)
const updateSensitivityTestApplication = new UpdateSensitivityTestApplication(endodonticsModel)
const updateDiagnosisApplication = new UpdateDiagnosisApplication(endodonticsModel)
const updateDuctsApplication = new UpdateDuctsApplication(endodonticsModel)


export const readEndodonticsController = new ReadEndodonticsController(readEndodonticsApplication, errorHandler)
export const readEndodonticsTeethController = new ReadEndodonticsTeethController(readEndodonticsTeethApplication, errorHandler)
export const updateExamNotesController = new UpdateExamNotesController(updateExamNotesApplication, errorHandler)
export const updatePainController = new UpdatePainController(updatePainApplication, errorHandler)
export const updateClinicalExaminationController = new UpdateClinicalExaminationController(updateClinicalExaminationApplication, errorHandler)
export const updateClinicalExaminationMultilineController = new UpdateClinicalExaminationMultilineController(updateClinicalExaminationMultilineApplication, errorHandler)
export const updateXRaysController = new UpdateXRaysController(updateXRaysApplication, errorHandler)
export const updateSensitivityTestController = new UpdateSensitivityTestController(updateSensitivityTestApplication, errorHandler)
export const updateDiagnosisController = new UpdateDiagnosisController(updateDiagnosisApplication, errorHandler)
export const updateDuctsController = new UpdateDuctsController(updateDuctsApplication, errorHandler)