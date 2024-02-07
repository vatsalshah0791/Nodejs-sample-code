'use strict'


import { db, SALT, checkSelect, checkInsert, createJwt, getObjectBase64, deleteObject, errorHandler } from './shared.import'

import AccountModel from './model/Account.model'

import SignupApplication from '../application/Signup.application'
import LoginApplication from '../application/Login.application'
import VerifyAccountApplication from '../application/VerifyAccount.application'
import ResetVerificationCodeApplication from '../application/ResetVerificationCode.application'
import GeneratePasswordResetCodeApplication from '../application/GeneratePasswordResetCode.application'
import VerifyCodeApplication from '../application/VerifyCode.application'
import ResetPasswordApplication from '../application/ResetPassword.application'
import ReadAccountApplication from '../application/ReadAccount.application'
import ReadAdminAccountApplication from '../application/ReadAdminAccount.application'
import ReadCollaboratorAccountApplication from '../application/ReadCollaboratorAccount.application'
import UpdateAdminAccountApplication from '../application/UpdateAdminAccount.application'
import UpdateUsernameApplication from '../application/UpdateUsername.application'
import UpdateLanguageApplication from '../application/UpdateLanguage.application'
import UpdatePasswordApplication from '../application/UpdatePassword.application'
import UpdatePhotoApplication from '../application/UpdatePhoto.application'


import SignupController from './controllers/Signup.controller'
import LoginController from './controllers/Login.controller'
import VerifyAccountController from './controllers/VerifyAccount.controller'
import ResetVerificationCodeController from './controllers/ResetVerificationCode.controller'
import GeneratePasswordResetCodeController from './controllers/GeneratePasswordResetCode.controller'
import VerifyCodeController from './controllers/VerifyCode.controller'
import ResetPasswordController from './controllers/ResetPassword.controller'
import ReadAccountController from './controllers/ReadAccount.controller'
import ReadAdminAccountController from './controllers/ReadAdminAccount.controller'
import ReadCollaboratorAccountController from './controllers/ReadCollaboratorAccount.controller'
import UpdateAdminAccountController from './controllers/UpdateAdminAccount.controller'
import UpdateUsernameController from './controllers/UpdateUsername.controller'
import UpdateLanguageController from './controllers/UpdateLanguage.controller'
import UpdatePasswordController from './controllers/UpdatePassword.controller'
import UpdatePhotoController from './controllers/updatePhoto.controller'


const accountModel = new AccountModel(db, SALT, checkSelect, checkInsert, createJwt)


const signupApplication = new SignupApplication(accountModel)
const loginApplication = new LoginApplication(accountModel)
const verifyAccountApplication = new VerifyAccountApplication(accountModel)
const resetVerificationCodeApplication = new ResetVerificationCodeApplication(accountModel)
const generatePasswordResetCodeApplication = new GeneratePasswordResetCodeApplication(accountModel)
const verifyCodeApplication = new VerifyCodeApplication(accountModel)
const resetPasswordApplication = new ResetPasswordApplication(accountModel)
const readAccountApplication = new ReadAccountApplication(accountModel, getObjectBase64)
const readAdminAccountApplication = new ReadAdminAccountApplication(accountModel)
const readCollaboratorAccountApplication = new ReadCollaboratorAccountApplication(accountModel)
const updateAdminAccountApplication = new UpdateAdminAccountApplication(accountModel)
const updateUsernameApplication = new UpdateUsernameApplication(accountModel)
const updateLanguageApplication = new UpdateLanguageApplication(accountModel)
const updatePasswordApplication = new UpdatePasswordApplication(accountModel)
const updatePhotoApplication = new UpdatePhotoApplication(accountModel, deleteObject)


export const signupController = new SignupController(signupApplication, errorHandler)
export const loginController = new LoginController(loginApplication, errorHandler)
export const verifyAccountController = new VerifyAccountController(verifyAccountApplication, errorHandler)
export const resetVerificationCodeController = new ResetVerificationCodeController(resetVerificationCodeApplication, errorHandler)
export const generatePasswordResetCodeController = new GeneratePasswordResetCodeController(generatePasswordResetCodeApplication, errorHandler)
export const verifyCodeController = new VerifyCodeController(verifyCodeApplication, errorHandler)
export const resetPasswordController = new ResetPasswordController(resetPasswordApplication, errorHandler)
export const readAccountController = new ReadAccountController(readAccountApplication, errorHandler)
export const readAdminAccountController = new ReadAdminAccountController(readAdminAccountApplication, errorHandler)
export const readCollaboratorAccountController = new ReadCollaboratorAccountController(readCollaboratorAccountApplication, errorHandler)
export const updateAdminAccountController = new UpdateAdminAccountController(updateAdminAccountApplication, errorHandler)
export const updateUsernameController = new UpdateUsernameController(updateUsernameApplication, errorHandler)
export const updateLanguageController = new UpdateLanguageController(updateLanguageApplication, errorHandler)
export const updatePasswordController = new UpdatePasswordController(updatePasswordApplication, errorHandler)
export const updatePhotoController = new UpdatePhotoController(updatePhotoApplication, errorHandler)