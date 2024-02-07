'use strict'


import CollaboratorRepository from '../domain/Collaborator.repository'

import { CreateCollaboratorInterface } from '../domain/interfaces/CreateCollaborator.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id: string }
}


export default class CreateCollaboratorApplication {
    constructor(private readonly collaboratorRepository: CollaboratorRepository) {}
    async run(data: CreateCollaboratorInterface): Promise<Result> {
        const checkPlanResult = await this.collaboratorRepository.checkPlan({ idAccount: data.idAccount })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Collaborator limit reached'
            }
            return response
        }
        const checkUsernameExistsResult = await this.collaboratorRepository.checkUsernameExists({ username: data.username })
        if(checkUsernameExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 409,
                message: 'The username entered is already in use'
            }
            return response
        }
        const createCollaboratorResult = await this.collaboratorRepository.createCollaborator(data)
        if(!createCollaboratorResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Failed to Create Collaborator'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: {
                id: createCollaboratorResult.id
            }
        }
        return response
    }
}