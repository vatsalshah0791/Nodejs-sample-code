'use strict'


import SmAccessToken from '../entities/SmAccessToken'


export interface CheckAccessTokenExistsInterface {
    idAccount: string
    accessToken: SmAccessToken['accessToken']
    allAccounts: boolean
}

export interface CheckAccessTokenExistsResultInterface {
    success: boolean
    idRole?: string
    idAccount?: string
}