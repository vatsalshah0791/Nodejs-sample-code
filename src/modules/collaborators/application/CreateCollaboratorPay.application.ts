'use strict'


import CollaboratorPayRepository from '../domain/CollaboratorPay.repository'

import { CreateCollaboratorPayInterface } from '../domain/interfaces/CreateCollaboratorPay.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateCollaboratorPayApplication {
    constructor(private readonly collaboratorPayRepository: CollaboratorPayRepository) {}
    async run(data: CreateCollaboratorPayInterface): Promise<Result> {
        const checkCollaboratorPayExistsResult = await this.collaboratorPayRepository.checkCollaboratorPayExists(data)
        if(checkCollaboratorPayExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 409,
                message: 'A payment already exists on record for the specified month.'
            }
            return response
        }
        const createCollaboratorPayResult = await this.collaboratorPayRepository.createCollaboratorPay(data)
        if(!createCollaboratorPayResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating payment'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: {
                id: createCollaboratorPayResult.id
            }
        }
        return response
    }
}