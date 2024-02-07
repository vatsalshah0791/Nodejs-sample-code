'use strict'


import { CheckEmailExistsInterface } from './interfaces/CheckEmailExists.interface'
import { CheckUsernameExistsInterface } from './interfaces/CheckUsernameExists.interface'
import { CheckAccountIsVerifiedInterface } from './interfaces/CheckAccountIsVerified.interface'
import { CheckVerificationCodeInterface } from './interfaces/CheckVerificationCode.interface'
import { CheckCodeInterface } from './interfaces/CheckCode.interface'
import { SignupInterface, SignupResultInterface } from './interfaces/Signup.interface'
import { LoginInterface, LoginResultInterface } from './interfaces/Login.interface'
import { ComparePasswordsInterface } from './interfaces/ComparePasswords.interface'
import { CreateAccessTokenInterface, CreateAccessTokenResultInterface } from './interfaces/CreateAccessToken.interface'
import { ResetVerificationCodeInterface, ResetVerificationCodeResultInterface } from './interfaces/ResetVerificationCode.interface'
import { ReadAccountInterface, ReadAccountResultInterface } from './interfaces/ReadAccount.interface'
import { ReadPasswordsInterface, ReadPasswordsResultInterface } from './interfaces/ReadPasswords.interface'
import { ReadAdminAccountInterface, ReadAdminAccountResultInterface } from './interfaces/ReadAdminAccount.interface'
import { ReadCollaboratorAccountInterface, ReadCollaboratorAccountResultInterface } from './interfaces/ReadCollaboratorAccount.interface'
import { ReadPhotoKeyInterface, ReadPhotoKeyResultInterface } from './interfaces/ReadPhotoKey.interface'
import { UpdatePasswordInterface } from './interfaces/UpdatePassword.interface'
import { UpdateAdminAccountInterface } from './interfaces/UpdateAdminAccount.interface'
import { UpdateUsernameInterface } from './interfaces/UpdateUsername.interface'
import { UpdateLanguageInterface } from './interfaces/UpdateLanguage.interface'
import { UpdatePhotoInterface } from './interfaces/UpdatePhoto.interface'
import { VerifyAccountInterface } from './interfaces/VerifyAccount.interface'
import { GeneratePasswordResetCodeInterface, GeneratePasswordResetCodeResultInterface } from './interfaces/GeneratePasswordResetCode.interface'


export default interface AccountRespository {

    checkEmailExists(data: CheckEmailExistsInterface): Promise<boolean>

    checkUsernameExists(data: CheckUsernameExistsInterface): Promise<boolean>

    checkAccountIsVerified(data: CheckAccountIsVerifiedInterface): Promise<boolean>

    checkVerificationCode(data: CheckVerificationCodeInterface): Promise<boolean>

    checkCode(data: CheckCodeInterface): Promise<boolean>

    signup(data: SignupInterface): Promise<SignupResultInterface>

    login(data: LoginInterface): Promise<LoginResultInterface>

    comparePasswords(data: ComparePasswordsInterface): Promise<boolean>

    createAccessToken(data: CreateAccessTokenInterface): Promise<CreateAccessTokenResultInterface>

    resetVerificationCode(data: ResetVerificationCodeInterface): Promise<ResetVerificationCodeResultInterface>

    readAccount(data: ReadAccountInterface): Promise<ReadAccountResultInterface>

    readPasswords(data: ReadPasswordsInterface): Promise<ReadPasswordsResultInterface>

    readAdminAccount(data: ReadAdminAccountInterface): Promise<ReadAdminAccountResultInterface>

    readCollaboratorAccount(data: ReadCollaboratorAccountInterface): Promise<ReadCollaboratorAccountResultInterface>

    readPhotoKey(data: ReadPhotoKeyInterface): Promise<ReadPhotoKeyResultInterface>

    updatePassword(data: UpdatePasswordInterface): Promise<boolean>

    updateAdminAccount(data: UpdateAdminAccountInterface): Promise<boolean>

    updateUsername(data: UpdateUsernameInterface): Promise<boolean>

    updateLanguage(data: UpdateLanguageInterface): Promise<boolean>

    updatePhoto(data: UpdatePhotoInterface): Promise<boolean>

    verifyAccount(data: VerifyAccountInterface): Promise<boolean>

    generatePasswordResetCode(data: GeneratePasswordResetCodeInterface): Promise<GeneratePasswordResetCodeResultInterface>

}