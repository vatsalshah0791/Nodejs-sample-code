'use strict'


import AccountRespository from '../domain/Account.repository'

import { ReadCollaboratorAccountInterface } from '../domain/interfaces/ReadCollaboratorAccount.interface'


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
        fullAddress?: string
        birthDate?: string
        emergencyPhonePrefix?: string
        emergencyPhone?: string
        emergencyName?: string
        role?: string
        language?: string
        idLanguage?: string
        gender?: string
        idGender?: string
        country?: string
        idCountry?: string
    }
}


export default class ReadCollaboratorAccountApplication {
    constructor(private readonly accountRespository: AccountRespository) {}
    async run(data: ReadCollaboratorAccountInterface): Promise<Result>{
        const readCollaboratorAccountResult = await this.accountRespository.readCollaboratorAccount(data)
        if(!readCollaboratorAccountResult.success) {
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
                language: readCollaboratorAccountResult.language
            },
            data: {
                id: readCollaboratorAccountResult.id,
                firstName: readCollaboratorAccountResult.firstName,
                lastName: readCollaboratorAccountResult.lastName,
                username: readCollaboratorAccountResult.username,
                createdAt: readCollaboratorAccountResult.createdAt,
                email: readCollaboratorAccountResult.email,
                phonePrefix: readCollaboratorAccountResult.phonePrefix,
                phone: readCollaboratorAccountResult.phone,
                fullAddress: readCollaboratorAccountResult.fullAddress,
                birthDate: readCollaboratorAccountResult.birthDate,
                emergencyPhonePrefix: readCollaboratorAccountResult.emergencyPhonePrefix,
                emergencyPhone: readCollaboratorAccountResult.emergencyPhone,
                emergencyName: readCollaboratorAccountResult.emergencyName,
                role: readCollaboratorAccountResult.role,
                language: readCollaboratorAccountResult.language,
                idLanguage: readCollaboratorAccountResult.idAppLanguage,
                gender: readCollaboratorAccountResult.gender,
                idGender: readCollaboratorAccountResult.idAppGender,
                country: readCollaboratorAccountResult.country,
                idCountry: readCollaboratorAccountResult.idAppCountry
            }
        }
        return response
    }
}