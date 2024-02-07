'use strict'


import CollaboratorRepository from '../domain/Collaborator.repository'

import { ReadCollaboratorsInterface, ReadCollaboratorsResultInterface } from '../domain/interfaces/ReadCollaborators.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string
    data?: ReadCollaboratorsResultInterface[]
}


export default class ReadCollaboratorsApplication {
    constructor(
        private readonly collaboratorRepository: CollaboratorRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadCollaboratorsInterface): Promise<Result> {
        const readCollaboratorsResult = await this.collaboratorRepository.readCollaborators(data)
        const mapReadCollaboratorsResult = readCollaboratorsResult.map(async collaborator => {
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
            data: collaborators,
        }
        return response
    }
}