'use strict'


import SmPhoto from '../entities/SmPhoto'


export interface ReadPhotosInterface {
    idPatient: SmPhoto['idSmPatient']
}

export interface ReadPhotosResultInterface {
    id: SmPhoto['id']
    photo: SmPhoto['photo']
    createdAt: SmPhoto['createdAt']
}