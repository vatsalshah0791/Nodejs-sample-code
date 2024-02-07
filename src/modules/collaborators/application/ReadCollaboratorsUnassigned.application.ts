'use strict'


import CollaboratorRepository from '../domain/Collaborator.repository'

import { ReadUnassignedByClinicInterface, ReadUnassignedByClinicResultInterface } from '../domain/interfaces/ReadUnassignedByClinic.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string
    data?: ReadUnassignedByClinicResultInterface[]
}


export default class ReadCollaboratorsUnassignedApplication {
    constructor(
        private readonly collaboratorRepository: CollaboratorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadUnassignedByClinicInterface): Promise<Result> {
        const readCollaboratorsUnassignedResult = await this.collaboratorRepository.readUnassignedByClinic(data)
        const mapReadCollaboratorsResult = readCollaboratorsUnassignedResult.map(async collaborator => {
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