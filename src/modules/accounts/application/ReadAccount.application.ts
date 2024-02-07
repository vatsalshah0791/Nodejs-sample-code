'use strict'


import AccountRespository from '../domain/Account.repository'

import { ReadAccountInterface } from '../domain/interfaces/ReadAccount.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string
    language: {
        refresh: boolean,
        language?: string
    }
    data?: {
        firstName?: string
        lastName?: string
        username?: string
        photo?: string | null
        role?: string
    }
}


export default class ReadAccountApplication {
    constructor(
        private readonly accountRespository: AccountRespository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadAccountInterface): Promise<Result> {
        const readAccountReault = await this.accountRespository.readAccount(data)
        if(!readAccountReault.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The account does not exist',
                language: { refresh: false }
            }
            return response
        }
        const photo = await this.getObjectBase64(readAccountReault.photo)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            language: {
                refresh: true,
                language: readAccountReault.language
            },
            data: {
                firstName: readAccountReault.firstName,
                lastName: readAccountReault.lastName,
                username: readAccountReault.username,
                photo: photo,
                role: readAccountReault.role,
            }
        }
        return response
    }
}