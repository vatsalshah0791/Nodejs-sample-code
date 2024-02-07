'use strict'


import AccountRespository from '../domain/Account.repository'

import { ResetVerificationCodeInterface } from '../domain/interfaces/ResetVerificationCode.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string,
    data?: {
        verificationCode?: string
        name?: string
        email?: string
    }
}


export default class ResetVerificationCodeApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: ResetVerificationCodeInterface): Promise<Result> {
        const checkAccountIsVerified = await this.accountRespository.checkAccountIsVerified(data)
        if(checkAccountIsVerified) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The account is already verified'
            }
            return response
        }
        const resetVerificationCodeResult = await this.accountRespository.resetVerificationCode(data)
        if(!resetVerificationCodeResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Verification code reset error'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                verificationCode: resetVerificationCodeResult.verificationCode,
                name: resetVerificationCodeResult.name,
                email: resetVerificationCodeResult.email
            }
        }
        return response
    }
}