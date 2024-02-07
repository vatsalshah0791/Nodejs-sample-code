'use strict'


import SmAccount from '../entities/SmAccount'
import SmCode from '../entities/SmCode'


export interface CheckCodeInterface {
    idAccount: SmAccount['id']
    code: SmCode['code']
}