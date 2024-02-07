'use strict'


import SmCollaborator from '../entities/SmCollaborator'


export interface ReadCollaboratorInterface {
    id: SmCollaborator['id']
}

export interface ReadCollaboratorResultInterface {
    success: boolean
    id?: SmCollaborator['id']
    firstName?: string
    lastName?: string
    username?: string
    photo?: string | null
    isActive?: boolean
    createdAt?: Date
    email?: SmCollaborator['email']
    phonePrefix?: SmCollaborator['phonePrefix']
    phone?: SmCollaborator['phone']
    fullAddress?: SmCollaborator['fullAddress']
    birthDate?: SmCollaborator['birthDate']
    emergencyPhonePrefix?: SmCollaborator['emergencyPhonePrefix']
    emergencyPhone?: SmCollaborator['emergencyPhone']
    emergencyName?: SmCollaborator['emergencyName']
    role?: string
    gender?: string
    idAppGender?: string
    country?: string
    idAppCountry?: string
}