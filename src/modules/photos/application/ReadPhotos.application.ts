'use strict'


import PhotoRepository from '../domain/Photo.repository'

import { ReadPhotosInterface, ReadPhotosResultInterface } from '../domain/interfaces/ReadPhotos.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPhotosResultInterface[]
}


export default class ReadPhotosApplication {
    constructor(
        private readonly photoRepository: PhotoRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadPhotosInterface): Promise<Result> {
        const readPhotosResult = await this.photoRepository.readPhotos(data)
        const mapReadPhotosResult = readPhotosResult.map(async photo => {
            try {
                photo.photo = await this.getObjectBase64(photo.photo)
                return photo
            } catch (error) {
                console.error(error)
                photo.photo = null
                return photo
            }
        })
        const photos = await Promise.all(mapReadPhotosResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: photos
        }
        return response
    }
}