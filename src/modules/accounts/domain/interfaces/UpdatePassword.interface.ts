'use strict'


import SmAccount from '../entities/SmAccount'


export interface UpdatePasswordInterface {
    idAccount: SmAccount['id']
    newPassword: string
}