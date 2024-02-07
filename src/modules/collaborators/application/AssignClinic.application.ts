'use strict'


import CollaboratorRepository from '../domain/Collaborator.repository'

import { AssingClinicInterface } from '../domain/interfaces/AssingClinic.interface'
import { CheckClinicalAssignmentExistsInterface } from '../domain/interfaces/CheckClinicalAssignmentExists.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class AssignClinicApplication {
    constructor(private readonly collaboratorRepository: CollaboratorRepository) {}
    async run(data: CheckClinicalAssignmentExistsInterface & AssingClinicInterface): Promise<Result> {
        const checkClinicalAssignmentExistsResult = await this.collaboratorRepository.checkClinicalAssignmentExists(data)
        if(checkClinicalAssignmentExistsResult) {
            const response: Result = {
                success: false,
                statusCode: 409,
                message: 'This account is already assigned to this clinic'
            }
            return response
        }
        const assingClinicResult = await this.collaboratorRepository.assingClinic(data)
        if(!assingClinicResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Failed to do assignment'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                id: assingClinicResult.id
            }
        }
        return response
    }
}