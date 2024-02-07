'use strict'


import SmCollaborator from '../entities/SmCollaborator'


export interface CreateCollaboratorInterface {
    firstName: string
    lastName: string
    username: string
    password: string
    photo: string | null
    email: SmCollaborator['email']
    phonePrefix: SmCollaborator['phonePrefix']
    phone: SmCollaborator['phone']
    fullAddress: SmCollaborator['fullAddress']
    birthDate: SmCollaborator['birthDate']
    emergencyPhonePrefix: SmCollaborator['emergencyPhonePrefix']
    emergencyPhone: SmCollaborator['emergencyPhone']
    emergencyName: SmCollaborator['emergencyName']
    idAppGender: SmCollaborator['idAppGender']
    idAppCountry: SmCollaborator['idAppCountry']
    idAppRole: string
    idAccount: string
}

export interface CreateCollaboratorResultInterface {
    success: boolean
    id: SmCollaborator['id']
}