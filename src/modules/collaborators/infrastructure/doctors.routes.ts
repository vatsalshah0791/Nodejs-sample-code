'use strict'


import { Router } from 'express'

import {
    createDoctorController,
    readDoctorsController,
    readDoctorsAssignedController,
    readDoctorsUnassignedController
} from './dependencies'

import { createDoctorSchema } from './schemas/createDoctor.schema'
import { readCollaboratorsAssignedSchema } from './schemas/readCollaboratorsAssigned.schema'

import {
    isAuthController,
    isAdmin,
    upload,
    schemaValidator,
    refreshTokenController,
    canReadController
} from './shared.import'


const router = Router()
const idSection = '11'


router.post(
    '/doctors',
    isAuthController.run(),
    isAdmin,
    upload({ nonFileFields: 15 }),
    schemaValidator(createDoctorSchema),
    createDoctorController.run,
    refreshTokenController.run
)
router.get(
    '/doctors',
    isAuthController.run(),
    isAdmin,
    readDoctorsController.run,
    refreshTokenController.run
)
router.get(
    '/doctors/assigned/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCollaboratorsAssignedSchema),
    readDoctorsAssignedController.run,
    refreshTokenController.run
)
router.get(
    '/doctors/unassigned/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCollaboratorsAssignedSchema),
    readDoctorsUnassignedController.run,
    refreshTokenController.run
)


export default router