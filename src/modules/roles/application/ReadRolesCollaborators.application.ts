'use strict'


import RoleRepository from '../domain/Role.repository'

import { ReadRolesResultInterface } from '../domain/interfaces/ReadRoles.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadRolesResultInterface[]
}


export default class ReadRolesCollaboratorsApplication {
    constructor(private readonly roleRepository: RoleRepository) {}
    async run(): Promise<Result> {
        const readRolesCollaboratorsResult = await this.roleRepository.readRollesCollaboratos()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readRolesCollaboratorsResult
        }
        return response
    }
}