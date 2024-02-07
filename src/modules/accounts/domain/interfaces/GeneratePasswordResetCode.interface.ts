'use strict'


import SmAccount from '../entities/SmAccount'
import SmAdmin from '../entities/SmAdmin'
import SmCode from '../entities/SmCode'


export interface GeneratePasswordResetCodeInterface {
    username: SmAccount['username']
}

export interface GeneratePasswordResetCodeResultInterface {
    success: boolean
    idAccount?: SmAccount['id']
    isActive?: SmAccount['isActive']
    email?: SmAdmin['email']
    code?: SmCode['code']
}