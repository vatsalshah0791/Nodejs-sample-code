'use strict'


import PatientRepository from '../domain/Patient.repository'

import { UpdatePhotoInterface } from '../domain/interfaces/UpdatePhoto.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePhotoApplication {
    constructor(
        private readonly patientRepository: PatientRepository,
        private readonly deleteObject: (Key: string | null | undefined) => Promise<boolean>
    ) {}
    async run(data: UpdatePhotoInterface) {
        const readPhotoKeyResult = await this.patientRepository.readPhotoKey({ id: data.id })
        if(!readPhotoKeyResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The patient does not exist'
            }
            return response
        }
        await this.deleteObject(readPhotoKeyResult.photo)
        const updatePhotoResult = await this.patientRepository.updatePhoto(data)
        if(!updatePhotoResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The patient does not exist'
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