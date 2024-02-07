'use strict'


import { Router } from 'express'

import {
    readEndodonticsController,
    readEndodonticsTeethController,
    updateExamNotesController,
    updatePainController,
    updateClinicalExaminationController,
    updateClinicalExaminationMultilineController,
    updateXRaysController,
    updateSensitivityTestController,
    updateDiagnosisController,
    updateDuctsController
} from './dependencies'

import { readEndodonticsSchema } from './schemas/readEndodontics.schemas'
import { readEndodonticsTeethSchema } from './schemas/readEndodonticsTeeth.schemas'
import { updateExamNotesSchema } from './schemas/updateExamNotes.schema'
import { updatePainSchema } from './schemas/updatePain.schema'
import { updateClinicalExaminationSchema } from './schemas/updateClinicalExamination.schema'
import { updateClinicalExaminationMultilineSchema } from './schemas/updateClinicalExaminationMultiline.schema'
import { updateXRaysSchema } from './schemas/updateXRays.schema'
import { updateSensitivityTestSchema } from './schemas/updateSensitivityTest.schema'
import { updateDiagnosisSchema } from './schemas/updateDiagnosis.schema'
import { updateDuctsSchema } from './schemas/updateDucts.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '9'


router.get(
    '/endodontics/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readEndodonticsSchema),
    readEndodonticsController.run,
    refreshTokenController.run
)
router.get(
    '/endodontics/:idPatient/:teeth',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readEndodonticsTeethSchema),
    readEndodonticsTeethController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/:id/updateNotes',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateExamNotesSchema),
    updateExamNotesController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/pain/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updatePainSchema),
    updatePainController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/clinicalExamination/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateClinicalExaminationSchema),
    updateClinicalExaminationController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/clinicalExamination/:id/multiline',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateClinicalExaminationMultilineSchema),
    updateClinicalExaminationMultilineController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/xRays/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateXRaysSchema),
    updateXRaysController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/sensitivityTest/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateSensitivityTestSchema),
    updateSensitivityTestController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/diagnosis/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateDiagnosisSchema),
    updateDiagnosisController.run,
    refreshTokenController.run
)
router.put(
    '/endodontics/ducts/:id',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateDuctsSchema),
    updateDuctsController.run,
    refreshTokenController.run
)


export default router