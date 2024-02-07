'use strict'


import PermissionRepository from '../domain/Permissions.repository'

import { CollaboratorReadPermissionsInterface, ReadPermissionsResultInterface } from '../domain/interfaces/ReadPermissions.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPermissionsResultInterface[]
}


export default class CollaboratorReadPermissionsApplication {
    constructor(private readonly permissionRepository: PermissionRepository) {}
    async run(data: CollaboratorReadPermissionsInterface): Promise<Result> {
        const collaboratorReadPermissionsResult = await this.permissionRepository.collaboratorReadPermissions(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: collaboratorReadPermissionsResult
        }
        return response
    }
}