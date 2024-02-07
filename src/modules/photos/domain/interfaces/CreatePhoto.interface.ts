'use strict'


import SmPhoto from '../entities/SmPhoto'


export interface CreatePhotoInterface {
    idSmPatient: SmPhoto['idSmPatient']
    photo: SmPhoto['photo']
}

export interface CreatePhotoResultInterface {
    success: boolean
    id?: SmPhoto['id']
}