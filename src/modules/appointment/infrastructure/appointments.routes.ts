'use strict'

import { Router } from 'express'

import {
    createAppointmentController,
    readAppointmentsByPatientController,
    readAppointmentsByClinicController,
    readAppointmentController,
    updateAppointmentController,
    updateStatusController
} from './dependencies'

import { createAppointmentSchema } from './schemas/createAppointment.schema'
import { readAppointmentsByPatientSchema } from './schemas/readAppointmentsByPatient.schema'
import { readAppointmentsByClinicSchema } from './schemas/readAppointmentsByClinic.shema'
import { readAppointmentSchema } from './schemas/readAppointment.schema'
import { updateAppointmentSchema } from './schemas/updateAppointment.schema'
import { updateStatuSchema } from './schemas/updateStatus.schema'

import {
    schemaValidator,
    isAuthController,
    refreshTokenController,
    canWriteController,
    canReadController
} from './shared.import'

const router = Router()
const idSection = '1'

router.post(
    '/appointments',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createAppointmentSchema),
    createAppointmentController.run,
    refreshTokenController.run
)
router.get(
    '/appointments/patient/:idPatient',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readAppointmentsByPatientSchema),
    readAppointmentsByPatientController.run,
    refreshTokenController.run
)
router.get(
    '/appointments/clinic/:idClinic',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readAppointmentsByClinicSchema),
    readAppointmentsByClinicController.run,
    refreshTokenController.run
)
router.get(
    '/appointments/:id',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readAppointmentSchema),
    readAppointmentController.run,
    refreshTokenController.run
)
router.put(
    '/appointments/:id/update',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateAppointmentSchema),
    updateAppointmentController.run,
    refreshTokenController.run
)
router.put(
    '/appointments/:id/updateStatus',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(updateStatuSchema),
    updateStatusController.run,
    refreshTokenController.run
)

export default router