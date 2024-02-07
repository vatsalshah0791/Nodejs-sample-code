'use strict'


import CollaboratorPayRepository from '../domain/CollaboratorPay.repository'

import { ReadCollaboratorPaymentsInterface, ReadCollaboratorPaymentsResultInterface } from '../domain/interfaces/ReadCollaboratorPayments.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: Omit<ReadCollaboratorPaymentsResultInterface, 'success'>
}


export default class ReadCollaboratorPaymentsApplication {
    constructor(private readonly collaboratorPayRepository: CollaboratorPayRepository) {}
    async run(data: ReadCollaboratorPaymentsInterface): Promise<Result> {
        const { success, ...readCollaboratorPayResult} = await this.collaboratorPayRepository.readCollaboratorPayments(data)
        if(!success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'Clinic or Collaborator does not exist'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readCollaboratorPayResult,
        }
        return response
    }
}