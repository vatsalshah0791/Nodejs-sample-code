'use strict'


import PermissionRepository from '../domain/Permissions.repository'

import { CheckPermissionsInterface } from '../domain/interfaces/CheckPermissions.interface'


interface Result {
    success: boolean
}


export default class CanReadApplication {
    constructor(private readonly permissionRepository: PermissionRepository) {}
    async run(data: CheckPermissionsInterface): Promise<Result> {
        const checkPermissionsCanReadResult = await this.permissionRepository.checkPermissionsCanRead(data)
        if(!checkPermissionsCanReadResult) {
            const response: Result = { success: false }
            return response
        }
        const response: Result = { success: true }
        return response
    }
}