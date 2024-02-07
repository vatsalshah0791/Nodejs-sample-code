'use strict'


import AccountRespository from '../domain/Account.repository'

import { UpdatePhotoInterface } from '../domain/interfaces/UpdatePhoto.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePhotoApplication {
    constructor(
        private readonly accountRespository: AccountRespository,
        private readonly deleteObject: (Key: string | null | undefined) => Promise<boolean>
    ) {}
    async run(data: UpdatePhotoInterface): Promise<Result> {
        const readPhotoKeyResult = await this.accountRespository.readPhotoKey({ idAccount: data.idAccount })
        if(!readPhotoKeyResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'Error finding photo'
            }
            return response
        }
        await this.deleteObject(readPhotoKeyResult.photo)
        const updatePhotoResult = await this.accountRespository.updatePhoto(data)
        if(!updatePhotoResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing photo'
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