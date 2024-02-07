'use strict'


import { Router } from 'express'

import {
    createCollaboratorController,
    readCollaboratorController,
    readCollaboratorsController,
    assignClinicController,
    readCollaboratorsUnassignedController,
    readCollaboratorsAssignedController
} from './dependencies'

import { createCollaboratorSchema } from './schemas/createCollaborator.schema'
import { readCollaboratorSchema } from './schemas/readCollaborator.schema'
import { assignClinicSchema } from './schemas/assignClinic.schemats'
import { readCollaboratorsUnassignedSchema } from './schemas/readCollaboratorsUnassigned.schema'
import { readCollaboratorsAssignedSchema } from './schemas/readCollaboratorsAssigned.schema'

import {
    isAuthController,
    isAdmin,
    upload,
    schemaValidator,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '11'


router.post(
    '/collaborators',
    isAuthController.run(),
    isAdmin,
    upload({ nonFileFields: 16 }),
    schemaValidator(createCollaboratorSchema),
    createCollaboratorController.run,
    refreshTokenController.run
)
router.get(
    '/collaborators',
    isAuthController.run(),
    isAdmin,
    readCollaboratorsController.run,
    refreshTokenController.run
)
router.get(
    '/collaborators/:id',
    isAuthController.run(),
    isAdmin,
    schemaValidator(readCollaboratorSchema),
    readCollaboratorController.run,
    refreshTokenController.run
)
router.post(
    '/collaborators/:idCollaborator/assignclinic',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(assignClinicSchema),
    assignClinicController.run,
    refreshTokenController.run
)
router.get(
    '/collaborators/assigned/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCollaboratorsAssignedSchema),
    readCollaboratorsAssignedController.run,
    refreshTokenController.run
)
router.get(
    '/collaborators/unassigned/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCollaboratorsUnassignedSchema),
    readCollaboratorsUnassignedController.run,
    refreshTokenController.run
)


export default router