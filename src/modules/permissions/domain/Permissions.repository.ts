'use strict'


import { CheckPermissionsInterface } from './interfaces/CheckPermissions.interface'
import { AdminReadPermissionsInterface, CollaboratorReadPermissionsInterface, ReadPermissionsResultInterface } from './interfaces/ReadPermissions.interface'
import { UpdatePermissionInterface } from './interfaces/UpdatePermission.interface'


export default interface PermissionRepository {

    checkPermissionsCanRead(data: CheckPermissionsInterface): Promise<boolean>

    checkPermissionsCanWrite(data: CheckPermissionsInterface): Promise<boolean>

    adminReadPermissions(data: AdminReadPermissionsInterface): Promise<ReadPermissionsResultInterface[]>

    collaboratorReadPermissions(data: CollaboratorReadPermissionsInterface): Promise<ReadPermissionsResultInterface[]>

    updatePermission(data: UpdatePermissionInterface): Promise<boolean>

}