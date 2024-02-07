'use strict'


import SmAccount from '../entities/SmAccount'


export interface ReadCollaboratorAccountInterface {
    idAccount: SmAccount['id']
}

export interface ReadCollaboratorAccountResultInterface {
    success: boolean
    id?: SmAccount['id']
    firstName?: SmAccount['firstName']
    lastName?: SmAccount['lastName']
    username?: SmAccount['username']
    createdAt?: SmAccount['createdAt']
    email?: string
    phonePrefix?: string
    phone?: string
    fullAddress?: string
    birthDate?: string
    emergencyPhonePrefix?: string
    emergencyPhone?: string
    emergencyName?: string
    role?: string
    language?: string
    idAppLanguage?: SmAccount['idAppLanguage']
    gender?: string
    idAppGender?: string
    country?: string
    idAppCountry?: string
}