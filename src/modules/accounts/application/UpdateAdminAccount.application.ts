'use strict'


import AccountRespository from '../domain/Account.repository'

import { UpdateAdminAccountInterface } from '../domain/interfaces/UpdateAdminAccount.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateAdminAccountApplication {
    constructor(private readonly accountRepository: AccountRespository) {}
    async run(data: UpdateAdminAccountInterface): Promise<Result> {
        const updateAdminAccountResult = await this.accountRepository.updateAdminAccount(data)
        if(!updateAdminAccountResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing user data'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Sucess'
        }
        return response
    }
}