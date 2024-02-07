'use strict'


import AccountRespository from '../domain/Account.repository'

import { CheckVerificationCodeInterface } from '../domain/interfaces/CheckVerificationCode.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class VerifyAccountApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: CheckVerificationCodeInterface): Promise<Result> {
        const checkVerificationCodeResult = await this.accountRespository.checkVerificationCode(data)
        if(!checkVerificationCodeResult) {
            const response: Result = {
                success: false,
                statusCode: 401,
                message: 'The verification code is wrong'
            }
            return response
        }
        await this.accountRespository.verifyAccount({ idAccount: data.idAccount })
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}