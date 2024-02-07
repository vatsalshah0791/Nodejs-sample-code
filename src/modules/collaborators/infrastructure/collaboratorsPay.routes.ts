'use strict'


import { Router } from 'express'

import {
    createCollaboratorPayController,
    readCollaboratorPaymentsController
} from './dependencies'

import { createCollaboratorPaySchema } from './schemas/createCollaboratorPay.schema'
import { readCollaboratorPaymentsSchema } from './schemas/readCollaboratorPayments.schema'

import {
    isAuthController,
    schemaValidator,
    refreshTokenController,
    canReadController,
    canWriteController
} from './shared.import'


const router = Router()
const idSection = '11'


router.post(
    '/collaboratorsPay/:idCollaborator',
    isAuthController.run(),
    canWriteController.run({ idSection }),
    schemaValidator(createCollaboratorPaySchema),
    createCollaboratorPayController.run,
    refreshTokenController.run
)
router.get(
    '/collaboratorsPayments/:idClinic/:idCollaborator/:year',
    isAuthController.run(),
    canReadController.run({ idSection }),
    schemaValidator(readCollaboratorPaymentsSchema),
    readCollaboratorPaymentsController.run,
    refreshTokenController.run
)


export default router