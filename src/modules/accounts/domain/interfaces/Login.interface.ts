'use strict'


import SmAccount from '../entities/SmAccount'


export interface LoginInterface {
    username: SmAccount['username']
}


export interface LoginResultInterface {
    success: boolean
    idAccount?: SmAccount['id']
    realPassword?: SmAccount['realPassword']
    isActive?: SmAccount['isActive']
    isVerified?: SmAccount['isVerified']
    role?: string
    language?: string
}