'use strict'


import SmAccount from '../entities/SmAccount'
import SmAccessToken from '../entities/SmAccessToken'


export interface CreateAccessTokenInterface {
    idAccount: SmAccount['id']
}


export interface CreateAccessTokenResultInterface {
    success: boolean
    accessToken?: SmAccessToken['accessToken']
}