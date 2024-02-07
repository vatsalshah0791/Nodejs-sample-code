'use strict'


import { QueryResult, Pool } from 'pg'

import PhotoRepository from '../../domain/Photo.repository'

import { CreatePhotoInterface, CreatePhotoResultInterface } from '../../domain/interfaces/CreatePhoto.interface'
import { ReadPhotosInterface, ReadPhotosResultInterface } from '../../domain/interfaces/ReadPhotos.interface'
import { ReadPhotoKeyInterface, ReadPhotoKeyResultInterface } from '../../domain/interfaces/ReadPhotoKey.interface'
import { DeletePhotoInterface } from '../../domain/interfaces/DeletePhoto.interface'

import createPhotoQuery from './querys/createPhoto.query'
import readPhotosQuery from './querys/readPhotos.query'
import readPhotoKeyQuery from './querys/readPhotoKey.query'
import deletePhotoQuery from './querys/deletePhoto.query'


export default class PhotoModel implements PhotoRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async createPhoto(data: CreatePhotoInterface): Promise<CreatePhotoResultInterface> {
        try {
            const values = [
                data.photo,
                data.idSmPatient
            ]
            const createPhotoQueryResult: QueryResult = await this.db().query(createPhotoQuery, values)
            if(this.checkInsert(createPhotoQueryResult)) {
                const modelResult: CreatePhotoResultInterface = {
                    success: true,
                    id: createPhotoQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreatePhotoResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.createPhoto')
            throw error
        }
    }
    async readPhotos(data: ReadPhotosInterface): Promise<ReadPhotosResultInterface[]> {
        try {
            const values = [data.idPatient]
            const readPhotosQueryResult: QueryResult = await this.db().query(readPhotosQuery, values)
            const photos = readPhotosQueryResult.rows.map(element => {
                const newElement = {
                    id: element.id,
                    photo: element.photo,
                    createdAt: element.as_date
                }
                return newElement
            })
            return photos
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.readPhotos')
            throw error
        }
    }
    async readPhotoKey(data: ReadPhotoKeyInterface): Promise<ReadPhotoKeyResultInterface> {
        try {
            const values = [data.id]
            const readPhotoKeyQueryResult: QueryResult = await this.db().query(readPhotoKeyQuery, values)
            if(this.checkSelect(readPhotoKeyQueryResult)) {
                const photo = readPhotoKeyQueryResult.rows[0]
                const modelResult: ReadPhotoKeyResultInterface = {
                    success: true,
                    photo: photo.photo
                }
                return modelResult
            }
            const modelResult: ReadPhotoKeyResultInterface = { success: true }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.readPhotoKey')
            throw error
        }
    }
    async deletePhoto(data: DeletePhotoInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deletePhotoQueryResult: QueryResult = await this.db().query(deletePhotoQuery, values)
            return this.checkInsert(deletePhotoQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.deletePhoto')
            throw error
        }
    }
}