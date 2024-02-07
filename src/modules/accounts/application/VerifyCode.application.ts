'use strict'


import AccountRespository from '../domain/Account.repository'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class VerifyCodeApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: { idAccount: string, code: string }): Promise<Result> {
        const checkCodeResult = await this.accountRespository.checkCode(data)
        if(!checkCodeResult) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The code is invalid or expired.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}