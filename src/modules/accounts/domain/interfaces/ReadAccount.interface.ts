'use strict'


import SmAccount from '../entities/SmAccount'


export interface ReadAccountInterface {
    idAccount: SmAccount['id']
}


export interface ReadAccountResultInterface {
    success: boolean
    firstName?: SmAccount['firstName']
    lastName?: SmAccount['lastName']
    username?: SmAccount['username']
    photo?: SmAccount['photo']
    role?: string
    language?: string
}