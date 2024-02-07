'use strict'


import { Router } from 'express'

import {
    readRolesAllController,
    readRolesCollaboratorsController
} from './dependencies'

import { noPatients, isAuthController, refreshTokenController } from './shared.import'


const router = Router()


router.get(
    '/roles/all',
    isAuthController.run(),
    noPatients,
    readRolesAllController.run,
    refreshTokenController.run
)
router.get(
    '/roles/collaborators',
    isAuthController.run(),
    noPatients,
    readRolesCollaboratorsController.run,
    refreshTokenController.run
)


export default router