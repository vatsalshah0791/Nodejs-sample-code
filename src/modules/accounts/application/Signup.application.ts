'use strict'


import AccountRespository from '../domain/Account.repository'

import { SignupInterface } from '../domain/interfaces/Signup.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    accessToken: {
        refresh: boolean,
        accessToken?: string
    }
    language: {
        refresh: boolean,
        language?: string
    }
    data?: {
        idAccount?: string
        name?: string
        username?: string
        isActive?: boolean
        isVerified?: boolean
        role?: string
        verificationCode?: string
    }
}


export default class SignupApplication {
    constructor(private readonly accountRepository: AccountRespository) {}
    async run(data: SignupInterface): Promise<Result> {
        const checkEmailExistsResult = await this.accountRepository.checkEmailExists({ email: data.email })
        if(checkEmailExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 409,
                message: 'The email entered is already in use',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        const checkUsernameExistsResult = await this.accountRepository.checkUsernameExists({ username: data.username })
        if(checkUsernameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 409,
                message: 'The username entered is already in use',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        const signupResult = await this.accountRepository.signup(data)
        if(!signupResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Failed to register',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            accessToken: {
                refresh: true,
                accessToken: signupResult.accessToken
            },
            language: {
                refresh: true,
                language: signupResult.language
            },
            data: {
                idAccount: signupResult.idAccount,
                name: signupResult.name,
                username: signupResult.username,
                isActive: signupResult.isActive,
                isVerified: signupResult.isVerified,
                role: signupResult.role,
                verificationCode: signupResult.verificationCode
            }
        }
        return response
    }
}