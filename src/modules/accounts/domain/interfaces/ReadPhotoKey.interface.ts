'use strict'


import SmAccount from '../entities/SmAccount'


export interface ReadPhotoKeyInterface {
    idAccount: SmAccount['id']
}

export interface ReadPhotoKeyResultInterface {
    success: boolean
    photo?: SmAccount['photo']
}