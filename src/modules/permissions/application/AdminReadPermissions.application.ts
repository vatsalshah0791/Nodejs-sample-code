'use strict'


import PermissionRepository from '../domain/Permissions.repository'

import { AdminReadPermissionsInterface, ReadPermissionsResultInterface } from '../domain/interfaces/ReadPermissions.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPermissionsResultInterface[]
}


export default class AdminReadPermissionsApplication {
    constructor(private readonly permissionRepository: PermissionRepository) {}
    async run (data: AdminReadPermissionsInterface): Promise<Result> {
        const adminReadPermissionsResult = await this.permissionRepository.adminReadPermissions(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: adminReadPermissionsResult
        }
        return response
    }
}