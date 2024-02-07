'use strict'


import CollaboratorRepository from '../domain/Collaborator.repository'

import { ReadCollaboratorInterface } from '../domain/interfaces/ReadCollaborator.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        id?: string
        firstName?: string
        lastName?: string
        username?: string
        photo?: string | null
        isActive?: boolean
        createdAt?: Date
        email?: string
        phonePrefix?: string
        phone?: string
        fullAddress?: string
        birthDate?: Date
        emergencyPhonePrefix?: string
        emergencyPhone?: string
        emergencyName?: string
        role?: string
        gender?: string
        idAppGender?: string
        country?: string
        idAppCountry?: string
    }
}


export default class ReadCollaboratorApplication {
    constructor(
        private readonly collaboratorRepository: CollaboratorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadCollaboratorInterface): Promise<Result> {
        const readCollaboratorResult = await this.collaboratorRepository.readCollaborator(data)
        if(!readCollaboratorResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Collaborator does not exist'
            }
            return response
        }
        const photo = await this.getObjectBase64(readCollaboratorResult.photo)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                id: readCollaboratorResult.id,
                firstName: readCollaboratorResult.firstName,
                lastName: readCollaboratorResult.lastName,
                username: readCollaboratorResult.username,
                photo,
                isActive: readCollaboratorResult.isActive,
                createdAt: readCollaboratorResult.createdAt,
                email: readCollaboratorResult.email,
                phonePrefix: readCollaboratorResult.phonePrefix,
                phone: readCollaboratorResult.phone,
                fullAddress: readCollaboratorResult.fullAddress,
                birthDate: readCollaboratorResult.birthDate,
                emergencyPhonePrefix: readCollaboratorResult.emergencyPhonePrefix,
                emergencyPhone: readCollaboratorResult.emergencyPhone,
                emergencyName: readCollaboratorResult.emergencyName,
                role: readCollaboratorResult.role,
                gender: readCollaboratorResult.gender,
                idAppGender: readCollaboratorResult.idAppGender,
                country: readCollaboratorResult.country,
                idAppCountry: readCollaboratorResult.idAppCountry
            }
        }
        return response
    }
}