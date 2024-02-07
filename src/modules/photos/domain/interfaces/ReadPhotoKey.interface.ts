'use strict'


import SmPhoto from '../entities/SmPhoto'


export interface ReadPhotoKeyInterface {
    id: SmPhoto['id']
}

export interface ReadPhotoKeyResultInterface {
    success: boolean
    photo?: SmPhoto['photo']
}