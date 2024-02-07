'use strict'


import SmAccount from '../entities/SmAccount'
import SmVerificationCode from '../entities/SmVerificationCode'


export interface CheckVerificationCodeInterface {
    idAccount: SmAccount['id']
    verificationCode: SmVerificationCode['verificationCode']
}