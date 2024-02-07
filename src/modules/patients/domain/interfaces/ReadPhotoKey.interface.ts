'use strict'


import SmPatient from '../entities/SmPatient'


export interface ReadPhotoKeyInterface {
    id: SmPatient['id']
}

export interface ReadPhotoKeyResultInterface {
    success: boolean
    photo?: string | null
}