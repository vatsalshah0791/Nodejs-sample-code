'use strict'


import AccountRespository from '../domain/Account.repository'

import { UpdateUsernameInterface } from '../domain/interfaces/UpdateUsername.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateUsernameApplication {
    constructor(private readonly accountRepository: AccountRespository) {}
    async run(data: UpdateUsernameInterface): Promise<Result> {
        const checkUsernameExistsResult = await this.accountRepository.checkUsernameExists({ username: data.newUsername })
        if(checkUsernameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 409,
                message: 'The username entered is already in use'
            }
            return response
        }
        const updateUsernameResult = await this.accountRepository.updateUsername(data)
        if(!updateUsernameResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing username'
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