'use strict'


import SmAccount from '../entities/SmAccount'
import SmAdmin from '../entities/SmAdmin'


export interface ReadAdminAccountInterface {
    idAccount: SmAccount['id']
}

export interface ReadAdminAccountResultInterface {
    success: boolean
    id?: SmAccount['id']
    firstName?: SmAccount['firstName']
    lastName?: SmAccount['lastName']
    username?: SmAccount['username']
    createdAt?: SmAccount['createdAt']
    email?: SmAdmin['email']
    phonePrefix?: SmAdmin['phonePrefix']
    phone?: SmAdmin['phone']
    companyName?: SmAdmin['companyName']
    birthDate?: SmAdmin['birthDate']
    role?: string
    language?: string
    idAppLanguage?: SmAccount['idAppLanguage']
    gender?: string
    idAppGender?: SmAdmin['idAppGender']
    country?: string
    idAppCountry?: SmAdmin['idAppCountry']
}