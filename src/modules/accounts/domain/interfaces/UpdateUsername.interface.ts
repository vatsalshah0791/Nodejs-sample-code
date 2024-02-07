'use strict'


import SmAccount from '../entities/SmAccount'


export interface UpdateUsernameInterface {
    idAccount: SmAccount['id']
    newUsername: SmAccount['username']
}