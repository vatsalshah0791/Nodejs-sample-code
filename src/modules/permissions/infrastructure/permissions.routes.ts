'use strict'


import { Router } from 'express'

import {
    adminReadPermissionsController,
    collaboratorReadPermissionsController,
    updatePermissionController
} from './dependencies'

import { updatePermissionSchema } from './schemas/updatePermission.schema'

import { schemaValidator, isAuthController, refreshTokenController, isAdmin, isCollaborator } from './shared.import'


const router = Router()


router.get(
    '/permissions/adminRead/:id',
    isAuthController.run(),
    isAdmin,
    adminReadPermissionsController.run,
    refreshTokenController.run
)

router.get(
    '/permissions/collaboratorRead',
    isAuthController.run(),
    isCollaborator,
    collaboratorReadPermissionsController.run,
    refreshTokenController.run
)

router.put(
    '/permissions',
    isAuthController.run(),
    isAdmin,
    schemaValidator(updatePermissionSchema),
    updatePermissionController.run,
    refreshTokenController.run
)


export default router