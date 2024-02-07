'use strict'


import AccountRespository from '../domain/Account.repository'

import { ReadAdminAccountInterface } from '../domain/interfaces/ReadAdminAccount.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string
    language: {
        refresh: boolean,
        language?: string
    }
    data?: {
        id?: string
        firstName?: string
        lastName?: string
        username?: string
        createdAt?: Date
        email?: string
        phonePrefix?: string | null
        phone?: string | null
        companyName?: string
        birthDate?: Date | null
        role?: string
        language?: string
        idLanguage?: string
        gender?: string
        idGender?: string
        country?: string
        idCountry?: string
    }
}


export default class ReadAdminAccountApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: ReadAdminAccountInterface): Promise<Result>{
        const readAdminAccountResult = await this.accountRespository.readAdminAccount(data)
        if(!readAdminAccountResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The account does not exist',
                language: { refresh: false }
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            language: {
                refresh: true,
                language: readAdminAccountResult.language
            },
            data: {
                id: readAdminAccountResult.id,
                firstName: readAdminAccountResult.firstName,
                lastName: readAdminAccountResult.lastName,
                username: readAdminAccountResult.username,
                createdAt: readAdminAccountResult.createdAt,
                email: readAdminAccountResult.email,
                phonePrefix: readAdminAccountResult.phonePrefix,
                phone: readAdminAccountResult.phone,
                companyName: readAdminAccountResult.companyName,
                birthDate: readAdminAccountResult.birthDate,
                role: readAdminAccountResult.role,
                language: readAdminAccountResult.language,
                idLanguage: readAdminAccountResult.idAppLanguage,
                gender: readAdminAccountResult.gender,
                idGender: readAdminAccountResult.idAppGender,
                country: readAdminAccountResult.country,
                idCountry: readAdminAccountResult.idAppCountry
            }
        }
        return response
    }
}