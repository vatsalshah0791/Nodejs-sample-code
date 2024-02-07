'use strict'


import CollaboratorRepository from '../domain/Collaborator.repository'

import { ReadAssignedByClinicInterface, ReadAssignedByClinicResultInterface } from '../domain/interfaces/ReadAssignedByClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadAssignedByClinicResultInterface[]
}


export default class ReadCollaboratorsAssignedApplication {
    constructor(
        private readonly collaboratorRepository: CollaboratorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadAssignedByClinicInterface): Promise<Result> {
        const readCollaboratorsAssigned = await this.collaboratorRepository.readAssignedByClinic(data)
        const mapReadCollaboratorsResult = readCollaboratorsAssigned.map(async collaborator => {
            try {
                collaborator.photo = await this.getObjectBase64(collaborator.photo)
                return collaborator
            } catch (error) {
                console.error(error)
                collaborator.photo = null
                return collaborator
            }
        })
        const collaborators = await Promise.all(mapReadCollaboratorsResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: collaborators
        }
        return response
    }
}