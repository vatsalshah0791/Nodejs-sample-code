'use strict'


import { ReadRolesResultInterface } from './interfaces/ReadRoles.interface'


export default interface RoleRepository {

    readRolesAll(): Promise<ReadRolesResultInterface[]>

    readRollesCollaboratos(): Promise<ReadRolesResultInterface[]>

}