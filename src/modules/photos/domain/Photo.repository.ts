'use strict'


import { CreatePhotoInterface, CreatePhotoResultInterface } from './interfaces/CreatePhoto.interface'
import { ReadPhotosInterface, ReadPhotosResultInterface } from './interfaces/ReadPhotos.interface'
import { ReadPhotoKeyInterface, ReadPhotoKeyResultInterface } from './interfaces/ReadPhotoKey.interface'
import { DeletePhotoInterface } from './interfaces/DeletePhoto.interface'


export default interface PhotoRepository {

    createPhoto(data: CreatePhotoInterface): Promise<CreatePhotoResultInterface>

    readPhotos(data: ReadPhotosInterface): Promise<ReadPhotosResultInterface[]>

    readPhotoKey(data: ReadPhotoKeyInterface): Promise<ReadPhotoKeyResultInterface>

    deletePhoto(data: DeletePhotoInterface): Promise<boolean>

}