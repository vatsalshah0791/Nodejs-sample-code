'use strict'


import PermissionRepository from '../domain/Permissions.repository'

import { UpdatePermissionInterface } from '../domain/interfaces/UpdatePermission.interface'

interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdatePermissionApplication {
    constructor(private readonly permissionRepository: PermissionRepository) {}
    async run(data: UpdatePermissionInterface): Promise<Result> {
        const updatePermissionResult = await this.permissionRepository.updatePermission(data)
        if(!updatePermissionResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing permission.'
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