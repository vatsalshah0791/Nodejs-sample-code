'use strict'


import SmAccount from '../entities/SmAccount'
import SmAdmin from '../entities/SmAdmin'
import SmVerificationCode from '../entities/SmVerificationCode'
import SmAccessToken from '../entities/SmAccessToken'


export interface SignupInterface {
    firstName: SmAccount['firstName']
    lastName: SmAccount['lastName']
    username: SmAccount['username']
    password: string
    email: SmAdmin['email']
    companyName: SmAdmin['companyName']
    idAppGender: SmAdmin['idAppGender']
    idAppCountry: SmAdmin['idAppCountry']
}


export interface SignupResultInterface {
    success: boolean
    idAccount?: SmAccount['id']
    name?: string
    username?: SmAccount['username']
    isActive?: SmAccount['isActive']
    isVerified?: SmAccount['isVerified']
    role?: string
    language?: string
    verificationCode?: SmVerificationCode['verificationCode']
    accessToken?: SmAccessToken['accessToken']
}