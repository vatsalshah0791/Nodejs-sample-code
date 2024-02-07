'use strict'


import SmAccount from '../entities/SmAccount'
import SmVerificationCode from '../entities/SmVerificationCode'


export interface ResetVerificationCodeInterface {
    idAccount: SmAccount['id']
}

export interface ResetVerificationCodeResultInterface {
    success: boolean
    verificationCode?: SmVerificationCode['verificationCode']
    name?: string
    email?: string
}