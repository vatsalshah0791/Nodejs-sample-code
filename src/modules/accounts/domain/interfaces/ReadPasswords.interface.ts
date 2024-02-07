'use strict'


import SmAccount from '../entities/SmAccount'


export interface ReadPasswordsInterface {
    idAccount: SmAccount['id']
}


export interface ReadPasswordsResultInterface {
    success: boolean
    realPassword?: SmAccount['realPassword']
    oldPassword?: SmAccount['oldPassword']
}