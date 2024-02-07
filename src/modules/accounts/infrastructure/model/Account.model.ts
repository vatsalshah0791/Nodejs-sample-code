'use strict'


import { QueryResult, PoolClient, Pool } from 'pg'
import { v4 as uuidv4 } from 'uuid'
import { hash, compareSync } from 'bcryptjs'

import AccountRespository from '../../domain/Account.repository'

import { CheckEmailExistsInterface } from '../../domain/interfaces/CheckEmailExists.interface'
import { CheckUsernameExistsInterface } from '../../domain/interfaces/CheckUsernameExists.interface'
import { CheckAccountIsVerifiedInterface } from '../../domain/interfaces/CheckAccountIsVerified.interface'
import { CheckVerificationCodeInterface } from '../../domain/interfaces/CheckVerificationCode.interface'
import { CheckCodeInterface } from '../../domain/interfaces/CheckCode.interface'
import { SignupInterface, SignupResultInterface } from '../../domain/interfaces/Signup.interface'
import { LoginInterface, LoginResultInterface } from '../../domain/interfaces/Login.interface'
import { ComparePasswordsInterface } from '../../domain/interfaces/ComparePasswords.interface'
import { CreateAccessTokenInterface, CreateAccessTokenResultInterface } from '../../domain/interfaces/CreateAccessToken.interface'
import { ResetVerificationCodeInterface, ResetVerificationCodeResultInterface } from '../../domain/interfaces/ResetVerificationCode.interface'
import { ReadAccountInterface, ReadAccountResultInterface } from '../../domain/interfaces/ReadAccount.interface'
import { ReadPasswordsInterface, ReadPasswordsResultInterface } from '../../domain/interfaces/ReadPasswords.interface'
import { ReadAdminAccountInterface, ReadAdminAccountResultInterface } from '../../domain/interfaces/ReadAdminAccount.interface'
import { ReadCollaboratorAccountInterface, ReadCollaboratorAccountResultInterface } from '../../domain/interfaces/ReadCollaboratorAccount.interface'
import { ReadPhotoKeyInterface, ReadPhotoKeyResultInterface } from '../../domain/interfaces/ReadPhotoKey.interface'
import { UpdatePasswordInterface } from '../../domain/interfaces/UpdatePassword.interface'
import { UpdateAdminAccountInterface } from '../../domain/interfaces/UpdateAdminAccount.interface'
import { UpdateUsernameInterface } from '../../domain/interfaces/UpdateUsername.interface'
import { UpdateLanguageInterface } from '../../domain/interfaces/UpdateLanguage.interface'
import { UpdatePhotoInterface } from '../../domain/interfaces/UpdatePhoto.interface'
import { VerifyAccountInterface } from '../../domain/interfaces/VerifyAccount.interface'
import { GeneratePasswordResetCodeInterface, GeneratePasswordResetCodeResultInterface } from '../../domain/interfaces/GeneratePasswordResetCode.interface'

import checkEmailExistsQuery from './querys/checkEmailExists.query'
import checkUsernameExistsQuery from './querys/checkUsernameExists.query'
import checkAccountIsVerifiedQuery from './querys/checkAccountIsVerified.query'
import checkVerificationCodeQuery from './querys/checkVerificationCode.query'
import checkCodeQuery from './querys/checkCode.query'
import signupTransactions from './transactions/signup.transactions'
import loginQuery from './querys/login.query'
import createAccessTokenQuery from './querys/createAccessToken.query'
import resetVerificationCodeTransactions from './transactions/resetVerificationCode.transactions'
import readAccountQuery from './querys/readAccount.query'
import readPasswordsQuery from './querys/readPasswords.query'
import readAdminAccountQuery from './querys/readAdminAccount.query'
import readCollaboratorAccountQuery from './querys/readCollaboratorAccount.query'
import readPhotoKeyQuery from './querys/readPhotoKey.query'
import updatePasswordTransactions from './transactions/updatePassword.transactions'
import updateAdminAccount from './transactions/updateAdminAccount.transactions'
import updateUsernameQuery from './querys/updateUsername.query'
import updateLanguageQuery from './querys/updateLanguage.query'
import updatePhotoQuery from './querys/updatePhoto.query'
import verifyAccountTransactions from './transactions/verifyAccount.transactions'
import generatePasswordResetCodeTransactions from './transactions/generatePasswordResetCode.transactions'


export default class AccountModel implements AccountRespository {
    constructor(
        private readonly db: () => Pool,
        private readonly salt: number,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean,
        private readonly createJwt: (param: { idAccount: string }) => string
    ) {}
    async checkEmailExists(data: CheckEmailExistsInterface): Promise<boolean> {
        try {
            const values = [data.email]
            const checkEmailExistsQueryResult: QueryResult = await this.db().query(checkEmailExistsQuery, values)
            return this.checkSelect(checkEmailExistsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.checkEmailExists')
            throw error
        }
    }
    async checkUsernameExists(data: CheckUsernameExistsInterface): Promise<boolean> {
        try {
            const values = [data.username]
            const checkUsernameExistsQueryResult: QueryResult = await this.db().query(checkUsernameExistsQuery, values)
            return this.checkSelect(checkUsernameExistsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.checkUsernameExists')
            throw error
        }
    }
    async checkAccountIsVerified(data: CheckAccountIsVerifiedInterface): Promise<boolean> {
        try {
            const values = [data.idAccount]
            const checkAccountIsVerifiedQueryResult: QueryResult = await this.db().query(checkAccountIsVerifiedQuery, values)
            return this.checkSelect(checkAccountIsVerifiedQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.checkAccountIsVerified')
            throw error
        }
    }
    async checkVerificationCode(data: CheckVerificationCodeInterface): Promise<boolean> {
        try {
            const values = [
                data.verificationCode,
                data.idAccount
            ]
            const checkVerificationCodeQueryResult: QueryResult = await this.db().query(checkVerificationCodeQuery, values)
            return this.checkSelect(checkVerificationCodeQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.checkVerificationCode')
            throw error
        }
    }
    async checkCode(data: CheckCodeInterface): Promise<boolean> {
        try {
            const values = [
                data.code,
                data.idAccount
            ]
            const checkCodeQueryResult: QueryResult = await this.db().query(checkCodeQuery, values)
            return this.checkSelect(checkCodeQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.checkCode')
            throw error
        }
    }
    async signup(data: SignupInterface): Promise<SignupResultInterface> {
        let client: PoolClient = await this.db().connect()
        try {
            const [insertIntoSmAccount, insertIntoSmAdmin, insertIntoSmVerificationCode, insertIntoSmAccessToken] = signupTransactions
            const passwordCrypt: string = await hash(data.password, this.salt)
            const verificationCode: string = uuidv4()
            await client.query('BEGIN')

            const values1 = [
                data.firstName,
                data.lastName,
                data.username,
                passwordCrypt
            ]
            const insertSmAccountResult: QueryResult = await client.query(insertIntoSmAccount, values1)
            const idAccount = insertSmAccountResult.rows[0].id

            const values2 = [
                data.email,
                data.companyName,
                data.idAppGender,
                data.idAppCountry,
                idAccount
            ]
            await client.query(insertIntoSmAdmin, values2)

            const values3 = [
                verificationCode,
                idAccount
            ]
            await client.query(insertIntoSmVerificationCode, values3)

            const accessToken: string = this.createJwt({ idAccount })
            const values4 = [
                accessToken,
                idAccount
            ]
            await client.query(insertIntoSmAccessToken, values4)
            await client.query('COMMIT')
            const modelResult: SignupResultInterface = {
                success: true,
                idAccount,
                verificationCode,
                accessToken,
                username: data.username,
                name: `${data.firstName} ${data.lastName}`,
                role: 'admin',
                isVerified: false,
                isActive: true,
                language: 'en'
            }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: AccountModel.signup')
            throw error
        }
        finally {
            client.release()
        }
    }
    async login(data: LoginInterface): Promise<LoginResultInterface> {
        try {
            const values = [data.username]
            const loginQueryResult: QueryResult = await this.db().query(loginQuery, values)
            if(this.checkSelect(loginQueryResult)) {
                const account = loginQueryResult.rows[0]
                const modelResult: LoginResultInterface = {
                    success: true,
                    idAccount: account.as_id_sm_account,
                    realPassword: account.real_password,
                    isActive: account.is_active,
                    isVerified: account.is_verified,
                    role: account.role_name,
                    language: account.language_name
                }
                return modelResult
            }
            const modelResult: LoginResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.login')
            throw error
        }
    }
    async comparePasswords(data: ComparePasswordsInterface): Promise<boolean> {
        try {
            return compareSync(data.text, data.hash)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.comparePasswords')
            throw error
        }
    }
    async createAccessToken(data: CreateAccessTokenInterface): Promise<CreateAccessTokenResultInterface> {
        try {
            const accessToken: string = this.createJwt({ idAccount: data.idAccount })
            const values = [
                accessToken,
                data.idAccount
            ]
            const createAccessTokenQueryResult: QueryResult = await this.db().query(createAccessTokenQuery, values)
            if(this.checkInsert(createAccessTokenQueryResult)) {
                const modelResult: CreateAccessTokenResultInterface = {
                    success: true,
                    accessToken
                }
                return modelResult
            }
            const modelResult: CreateAccessTokenResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.createAccessToken')
            throw error
        }
    }
    async resetVerificationCode(data: ResetVerificationCodeInterface): Promise<ResetVerificationCodeResultInterface> {
        try {
            const [selectSmAccountSmAdmin, insertSmVerificationCode] = resetVerificationCodeTransactions
            const verificationCode: string = uuidv4()

            const values1 = [data.idAccount]
            const selectSmAccountSmAdminResult: QueryResult = await this.db().query(selectSmAccountSmAdmin, values1)
            if(!this.checkSelect(selectSmAccountSmAdminResult)) {
                const modelResult: ResetVerificationCodeResultInterface = { success: false }
                return modelResult
            }

            const values2 = [
                verificationCode,
                data.idAccount
            ]
            const insertSmVerificationCodeResult: QueryResult = await this.db().query(insertSmVerificationCode, values2)
            if(this.checkInsert(insertSmVerificationCodeResult)) {
                const accountAdmin = selectSmAccountSmAdminResult.rows[0]
                const modelResult: ResetVerificationCodeResultInterface = {
                    success: true,
                    verificationCode,
                    name: `${accountAdmin.first_name} ${accountAdmin.last_name}`,
                    email: accountAdmin.email
                }
                return modelResult
            }
            const modelResult: ResetVerificationCodeResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.resetVerificationCode')
            throw error
        }
    }
    async readAccount(data: ReadAccountInterface): Promise<ReadAccountResultInterface> {
        try {
            const values = [data.idAccount]
            const readAccountQueryResult: QueryResult = await this.db().query(readAccountQuery, values)
            if(this.checkSelect(readAccountQueryResult)) {
                const account = readAccountQueryResult.rows[0]
                const modelResult: ReadAccountResultInterface = {
                    success: true,
                    firstName: account.first_name,
                    lastName: account.last_name,
                    username: account.username,
                    photo: account.photo,
                    role: account.role_name,
                    language: account.language_name
                }
                return modelResult
            }
            const modelResult: ReadAccountResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.readAccount')
            throw error
        }
    }
    async readPasswords(data: ReadPasswordsInterface): Promise<ReadPasswordsResultInterface> {
        try {
            const values = [data.idAccount]
            const readPasswordsQueryResult: QueryResult = await this.db().query(readPasswordsQuery, values)
            if(this.checkSelect(readPasswordsQueryResult)) {
                const account = readPasswordsQueryResult.rows[0]
                const modelResult: ReadPasswordsResultInterface = {
                    success: true,
                    realPassword: account.real_password,
                    oldPassword: account.old_password
                }
                return modelResult
            }
            const modelResult: ReadPasswordsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.readPasswordsAccount')
            throw error
        }
    }
    async readAdminAccount(data: ReadAdminAccountInterface): Promise<ReadAdminAccountResultInterface> {
        try {
            const values = [data.idAccount]
            const readAdminAccountQueryResult: QueryResult = await this.db().query(readAdminAccountQuery, values)
            if(this.checkSelect(readAdminAccountQueryResult)) {
                const account = readAdminAccountQueryResult.rows[0]
                const modelResult: ReadAdminAccountResultInterface = {
                    success: true,
                    id: account.id,
                    firstName: account.first_name,
                    lastName: account.last_name,
                    username: account.username,
                    createdAt: account.as_created_at,
                    email: account.email,
                    phonePrefix: account.phone_prefix,
                    phone: account.phone,
                    companyName: account.company_name,
                    birthDate: account.as_birth_date,
                    role: account.role_name,
                    language: account.language_name,
                    idAppLanguage: account.as_id_app_language,
                    gender: account.gender_name,
                    idAppGender: account.as_id_app_gender,
                    country: account.country_name,
                    idAppCountry: account.as_id_app_country
                }
                return modelResult
            }
            const modelResult: ReadAdminAccountResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.readAdminAccount')
            throw error
        }
    }
    async readCollaboratorAccount(data: ReadCollaboratorAccountInterface): Promise<ReadCollaboratorAccountResultInterface> {
        try {
            const values = [data.idAccount]
            const readCollaboratorAccountQueryResult: QueryResult = await this.db().query(readCollaboratorAccountQuery, values)
            if(this.checkSelect(readCollaboratorAccountQueryResult)) {
                const account = readCollaboratorAccountQueryResult.rows[0]
                const modelResult: ReadCollaboratorAccountResultInterface = {
                    success: true,
                    id: account.id,
                    firstName: account.first_name,
                    lastName: account.last_name,
                    username: account.username,
                    createdAt: account.as_created_at,
                    email: account.email,
                    phonePrefix: account.phone_prefix,
                    phone: account.phone,
                    fullAddress: account.full_address,
                    birthDate: account.as_birth_date,
                    emergencyPhonePrefix: account.emergency_phone_prefix,
                    emergencyPhone: account.emergency_phone,
                    emergencyName: account.emergency_name,
                    role: account.role_name,
                    language: account.language_name,
                    idAppLanguage: account.as_id_app_language,
                    gender: account.gender_name,
                    idAppGender: account.as_id_app_gender,
                    country: account.country_name,
                    idAppCountry: account.as_id_app_country
                }
                return modelResult
            }
            const modelResult: ReadCollaboratorAccountResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.readCollaboratorAccount')
            throw error
        }
    }
    async readPhotoKey(data: ReadPhotoKeyInterface): Promise<ReadPhotoKeyResultInterface> {
        try {
            const values = [data.idAccount]
            const readPhotoKeyQueryResult: QueryResult = await this.db().query(readPhotoKeyQuery, values)
            if(this.checkSelect(readPhotoKeyQueryResult)) {
                const photoKey = readPhotoKeyQueryResult.rows[0]
                const modelResult: ReadPhotoKeyResultInterface = {
                    success: true,
                    photo: photoKey.photo
                }
                return modelResult
            }
            const modelResult: ReadPhotoKeyResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.readPhotoKey')
            throw error
        }
    }
    async updatePassword(data: UpdatePasswordInterface): Promise<boolean> {
        let client: PoolClient = await this.db().connect()
        try {
            const [deleteSmAccessToken, deleteSmCode, updateSmAccount] = updatePasswordTransactions
            await client.query('BEGIN')
            const values1 = [data.idAccount]
            await client.query(deleteSmAccessToken, values1)
            await client.query(deleteSmCode, values1)

            const passwordCrypt: string = await hash(data.newPassword, this.salt)
            const values2 = [
                passwordCrypt,
                data.idAccount
            ]
            const updateSmAccountResult: QueryResult = await client.query(updateSmAccount, values2)
            await client.query('COMMIT')
            return this.checkInsert(updateSmAccountResult)
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: AccountModel.updatePassword')
            throw error
        }
        finally {
            client.release()
        }
    }
    async updateAdminAccount(data: UpdateAdminAccountInterface): Promise<boolean> {
        let client: PoolClient = await this.db().connect()
        try {
            const [updateSmAccount, updateSmAdmin] = updateAdminAccount
            await client.query('BEGIN')
            const values1 = [
                data.firstName,
                data.lastName,
                data.idAccount
            ]
            const updateSmAccountResult: QueryResult = await client.query(updateSmAccount, values1)
            if(!this.checkInsert(updateSmAccountResult)) {
                await client.query('ROLLBACK')
                return false
            }

            const values2 = [
                data.phonePrefix,
                data.phone,
                data.companyName,
                data.birthDate,
                data.idAppGender,
                data.idAppCountry,
                data.idAccount
            ]
            const updateSmAdminResult: QueryResult = await client.query(updateSmAdmin, values2)
            if(!this.checkInsert(updateSmAdminResult)) {
                await client.query('ROLLBACK')
                return false
            }
            await client.query('COMMIT')
            return true
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: AccountModel.updateAdminAccount')
            throw error
        }
        finally {
            client.release()
        }
    }
    async updateUsername(data: UpdateUsernameInterface): Promise<boolean> {
        try {
            const values = [
                data.newUsername,
                data.idAccount
            ]
            const updateAccountUsernameQueryResult: QueryResult = await this.db().query(updateUsernameQuery, values)
            return this.checkInsert(updateAccountUsernameQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.updateUsername')
            throw error
        }
    }
    async updateLanguage(data: UpdateLanguageInterface): Promise<boolean> {
        try {
            const values = [
                data.idAppLanguage,
                data.idAccount
            ]
            const updateAccountLanguageQueryResult: QueryResult = await this.db().query(updateLanguageQuery, values)
            return this.checkInsert(updateAccountLanguageQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.updateLanguage')
            throw error
        }
    }
    async updatePhoto(data: UpdatePhotoInterface): Promise<boolean> {
        try {
            const values = [
                data.photo,
                data.idAccount
            ]
            const updatePhotoQueryResult: QueryResult = await this.db().query(updatePhotoQuery, values)
            return this.checkInsert(updatePhotoQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.updatePhoto')
            throw error
        }
    }
    async verifyAccount(data: VerifyAccountInterface): Promise<boolean> {
        let client: PoolClient = await this.db().connect()
        try {
            const [updateSmAccount, updateSmVerificationCode] = verifyAccountTransactions
            const values = [data.idAccount]
            await client.query('BEGIN')
            await client.query(updateSmAccount, values)
            await client.query(updateSmVerificationCode, values)
            await client.query('COMMIT')
            return true
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: AccountModel.verifyAccount')
            throw error
        }
        finally {
            client.release()
        }
    }
    async generatePasswordResetCode(data: GeneratePasswordResetCodeInterface): Promise<GeneratePasswordResetCodeResultInterface> {
        try {
            const [selectSmAccount, insertSmCode] = generatePasswordResetCodeTransactions

            const values1 = [data.username]
            const selectSmAccountResult: QueryResult = await this.db().query(selectSmAccount, values1)
            if(!this.checkSelect(selectSmAccountResult)) {
                const modelResult: GeneratePasswordResetCodeResultInterface = { success: false }
                return modelResult
            }
            const account = selectSmAccountResult.rows[0]
            const idAccount = account.id

            const code: string = uuidv4()
            const values2 = [
                code,
                idAccount
            ]
            const insertSmCodeResult: QueryResult = await this.db().query(insertSmCode, values2)
            if(this.checkInsert(insertSmCodeResult)) {
                const modelResult: GeneratePasswordResetCodeResultInterface = {
                    success: true,
                    idAccount,
                    isActive: account.is_active,
                    email: account.email,
                    code
                }
                return modelResult
            }
            const modelResult: GeneratePasswordResetCodeResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: AccountModel.generatePasswordResetCode')
            throw error
        }
    }
}