'use strict'


import PhotoRepository from '../domain/Photo.repository'

import { DeletePhotoInterface } from '../domain/interfaces/DeletePhoto.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeletePhotoApplication {
    constructor(
        private readonly photoRepository: PhotoRepository,
        private readonly deleteObject: (Key: string | null | undefined) => Promise<boolean>
    ) {}
    async run(data: DeletePhotoInterface): Promise<Result> {
        const readPhotoKeyResult = await this.photoRepository.readPhotoKey(data)
        if(!readPhotoKeyResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The photo does not exist'
            }
            return response
        }
        await this.deleteObject(readPhotoKeyResult.photo)
        const deletePhotoResult = await this.photoRepository.deletePhoto(data)
        if(!deletePhotoResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error deleting photo'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}