'use strict'


import AccountRespository from '../domain/Account.repository'

import { UpdateLanguageInterface } from '../domain/interfaces/UpdateLanguage.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateLanguageApplication {
    constructor(private readonly accountRepository: AccountRespository) {}
    async run(data: UpdateLanguageInterface): Promise<Result> {
        const updateLanguageResult = await this.accountRepository.updateLanguage(data)
        if(!updateLanguageResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing language'
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