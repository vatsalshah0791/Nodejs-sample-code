'use strict'


import PermissionRepository from '../domain/Permissions.repository'

import { CheckPermissionsInterface } from '../domain/interfaces/CheckPermissions.interface'


interface Result {
    success: boolean
}


export default class CanWriteApplication {
    constructor(private readonly permissionRepository: PermissionRepository) {}
    async run(data: CheckPermissionsInterface): Promise<Result> {
        const checkPermissionsCanWriteResult = await this.permissionRepository.checkPermissionsCanWrite(data)
        if(!checkPermissionsCanWriteResult) {
            const response: Result = { success: false }
            return response
        }
        const response: Result = { success: true }
        return response
    }
}