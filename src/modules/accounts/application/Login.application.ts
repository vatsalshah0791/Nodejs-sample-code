'use strict'


import AccountRespository from '../domain/Account.repository'

import { LoginInterface } from '../domain/interfaces/Login.interface'


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
        isActive?: boolean
        isVerified?: boolean
        role?: string
    }
}


export default class LoginApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run (data: LoginInterface & { password: string }): Promise<Result> {
        const loginResult = await this.accountRespository.login({ username: data.username })
        if(!loginResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The user is wrong',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        const comparePassword = await this.accountRespository.comparePasswords({
            text: data.password,
            hash: loginResult.realPassword as string
        })
        if(!comparePassword) {
            const response: Result = {
                success: false,
                statusCode: 401,
                message: 'Password is incorrect',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        if(!loginResult.isActive) {
            const response: Result = {
                success: false,
                statusCode: 403,
                message: 'The user is inactive',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        const createAccessTokenResult = await this.accountRespository.createAccessToken({ idAccount: loginResult.idAccount as string })
        if(!createAccessTokenResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error generating token',
                accessToken: { refresh: false },
                language: { refresh: false }
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            accessToken: {
                refresh: true,
                accessToken: createAccessTokenResult.accessToken,
            },
            language: {
                refresh: true,
                language: loginResult.language
            },
            data: {
                idAccount: loginResult.idAccount,
                isActive: loginResult.isActive,
                isVerified: loginResult.isVerified,
                role: loginResult.role
            }
        }
        return response
    }
}