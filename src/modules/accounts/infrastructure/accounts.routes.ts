'use strict'


import { Router } from 'express'

import {
    signupController,
    loginController,
    verifyAccountController,
    resetVerificationCodeController,
    generatePasswordResetCodeController,
    verifyCodeController,
    resetPasswordController,
    readAccountController,
    readAdminAccountController,
    readCollaboratorAccountController,
    updateAdminAccountController,
    updateUsernameController,
    updateLanguageController,
    updatePasswordController,
    updatePhotoController
} from './dependencies'

import { signupSchema } from './schemas/signup.schema'
import { loginSchema } from './schemas/login.schema'
import { verifyAccountSchema } from './schemas/verifyAccount.schema'
import { generatePasswordResetCodeSchema } from './schemas/generatePasswordResetCode.schemas'
import { verifyCodeSchema } from './schemas/verifyCode.schema'
import { resetPasswordSchema } from './schemas/resetPassword.schema'
import { updateAdminAccountSchema } from './schemas/updateAdminAccount.schema'
import { updateUsernameSchema } from './schemas/updateUsername.schema'
import { updateLanguageSchema } from './schemas/updateLanguage.schema'
import { updatePasswordSchema } from './schemas/updatePassword.schema'

import { schemaValidator, isAuthController, refreshTokenController, isAdmin, isCollaborator, noPatients, upload } from './shared.import'


const router = Router()


router.post(
    '/account/signup',
    schemaValidator(signupSchema),
    signupController.run
)
router.post(
    '/account/login',
    schemaValidator(loginSchema),
    loginController.run
)
router.post(
    '/account/verificationAccount',
    isAuthController.run({ allAccounts: true }),
    isAdmin,
    schemaValidator(verifyAccountSchema),
    verifyAccountController.run,
    refreshTokenController.run
)
router.post(
    '/account/resetVerificationCode',
    isAuthController.run({ allAccounts: true }),
    isAdmin,
    resetVerificationCodeController.run,
    refreshTokenController.run
)
router.post(
    '/account/generatePasswordResetCode',
    schemaValidator(generatePasswordResetCodeSchema),
    generatePasswordResetCodeController.run,
    refreshTokenController.run
)
router.post(
    '/account/verifyCode',
    schemaValidator(verifyCodeSchema),
    verifyCodeController.run,
    refreshTokenController.run
)
router.post(
    '/account/resetPassword',
    schemaValidator(resetPasswordSchema),
    resetPasswordController.run,
    refreshTokenController.run
)

router.get(
    '/account',
    isAuthController.run(),
    readAccountController.run,
    refreshTokenController.run
)
router.get(
    '/account/admin',
    isAuthController.run(),
    isAdmin,
    readAdminAccountController.run,
    refreshTokenController.run
)
router.get(
    '/account/collaborator',
    isAuthController.run(),
    isCollaborator,
    readCollaboratorAccountController.run,
    refreshTokenController.run
)
router.put(
    '/account/admin',
    isAuthController.run(),
    isAdmin,
    schemaValidator(updateAdminAccountSchema),
    updateAdminAccountController.run,
    refreshTokenController.run
)
router.put(
    '/account/updateUsername',
    isAuthController.run(),
    schemaValidator(updateUsernameSchema),
    updateUsernameController.run,
    refreshTokenController.run
)
router.put(
    '/account/updateLanguage',
    isAuthController.run(),
    schemaValidator(updateLanguageSchema),
    updateLanguageController.run,
    refreshTokenController.run
)
router.put(
    '/account/updatePassword',
    isAuthController.run(),
    schemaValidator(updatePasswordSchema),
    updatePasswordController.run,
    refreshTokenController.run
)
router.put(
    '/account/updatePhoto',
    isAuthController.run(),
    noPatients,
    upload(),
    updatePhotoController.run,
    refreshTokenController.run
)


export default router