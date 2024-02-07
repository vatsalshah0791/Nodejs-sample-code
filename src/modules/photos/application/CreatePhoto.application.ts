'use strict'


import PhotoRepository from '../domain/Photo.repository'

import { CreatePhotoInterface } from '../domain/interfaces/CreatePhoto.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreatePhotoApplication {
    constructor(private readonly photoRepository: PhotoRepository) {}
    async run(data: CreatePhotoInterface): Promise<Result> {
        const createPhotoResult = await this.photoRepository.createPhoto(data)
        if(!createPhotoResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Error loading photo'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createPhotoResult.id }
        }
        return response
    }
}