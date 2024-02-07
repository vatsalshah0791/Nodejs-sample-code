'use strict'


import SmAccessToken from '../entities/SmAccessToken'


export interface CreateAccessTokenInterface {
    idAccount: string
}

export interface CreateAccessTokenResultInterface {
    success: boolean
    accessToken?: SmAccessToken['accessToken']
}