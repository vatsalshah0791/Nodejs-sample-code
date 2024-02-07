'use strict'


import AccountRespository from '../domain/Account.repository'

import { GeneratePasswordResetCodeInterface } from '../domain/interfaces/GeneratePasswordResetCode.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string,
    data?: {
        idAccount?: string
        email?: string
        code?: string
    }
}


export default class GeneratePasswordResetCodeApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: GeneratePasswordResetCodeInterface): Promise<Result> {
        const generatePasswordResetCodeResult = await this.accountRespository.generatePasswordResetCode({ username: data.username })
        if(!generatePasswordResetCodeResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'User not found.'
            }
            return response
        }
        if(!generatePasswordResetCodeResult.isActive) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The user is not active'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                idAccount: generatePasswordResetCodeResult.idAccount,
                email: generatePasswordResetCodeResult.email,
                code: generatePasswordResetCodeResult.code
            }
        }
        return response
    }
}