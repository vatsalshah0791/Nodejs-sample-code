'use strict'


import { Router } from 'express'

import {
    createClinicController,
    readClinicController,
    readClinicsByAdminController,
    readClinicsByCollaboratorController,
    readStaffStatisticsController,
    updateClinicController,
    updateLogoController
} from './dependencies'

import { createClinicSchema } from './schemas/createClinic.schema'
import { readClinicSchema } from './schemas/readClinic.schema'
import { readStaffStatisticsSchema } from './schemas/readStaffStatistics.schema'
import { updateClinicSchema } from './schemas/updateClinic.schema'
import { updateLogoSchema } from './schemas/updateLogo.schema'

import { schemaValidator, isAuthController, refreshTokenController, isAdmin, isCollaborator, noPatients, upload } from './shared.import'


const router = Router()


router.post(
    '/clinics',
    isAuthController.run(),
    isAdmin,
    upload({ nonFileFields: 8 }),
    schemaValidator(createClinicSchema),
    createClinicController.run,
    refreshTokenController.run
)
router.get(
    '/clinics/admin',
    isAuthController.run(),
    isAdmin,
    readClinicsByAdminController.run,
    refreshTokenController.run
)
router.get(
    '/clinics/collaborator',
    isAuthController.run(),
    isCollaborator,
    readClinicsByCollaboratorController.run,
    refreshTokenController.run
)
router.get(
    '/clinics/:id/staffStatistics',
    isAuthController.run(),
    noPatients,
    schemaValidator(readStaffStatisticsSchema),
    readStaffStatisticsController.run,
    refreshTokenController.run
)
router.get(
    '/clinics/:id',
    isAuthController.run(),
    noPatients,
    schemaValidator(readClinicSchema),
    readClinicController.run,
    refreshTokenController.run
)
router.put(
    '/clinics/:id/updateLogo',
    isAuthController.run(),
    isAdmin,
    upload(),
    schemaValidator(updateLogoSchema),
    updateLogoController.run,
    refreshTokenController.run
)
router.put(
    '/clinics/:id',
    isAuthController.run(),
    isAdmin,
    schemaValidator(updateClinicSchema),
    updateClinicController.run,
    refreshTokenController.run
)


export default router