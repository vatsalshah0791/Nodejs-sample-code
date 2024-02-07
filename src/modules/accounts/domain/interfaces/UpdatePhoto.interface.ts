'use strict'


import SmAccount from '../entities/SmAccount'


export interface UpdatePhotoInterface {
    idAccount: SmAccount['id']
    photo: SmAccount['photo']
}