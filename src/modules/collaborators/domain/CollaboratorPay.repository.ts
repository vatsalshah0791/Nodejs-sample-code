'use strict'


import { CreateCollaboratorPayInterface, CreateCollaboratorPayResultInterface } from './interfaces/CreateCollaboratorPay.interface'
import { CheckCollaboratorPayExistsInterface } from './interfaces/CheckCollaboratorPayExists.interface'
import { ReadCollaboratorPaymentsInterface, ReadCollaboratorPaymentsResultInterface } from './interfaces/ReadCollaboratorPayments.interface'


export default interface CollaboratorPayRepository {

    checkCollaboratorPayExists(data: CheckCollaboratorPayExistsInterface): Promise<boolean>

    createCollaboratorPay(data: CreateCollaboratorPayInterface): Promise<CreateCollaboratorPayResultInterface>

    readCollaboratorPayments(data: ReadCollaboratorPaymentsInterface): Promise<ReadCollaboratorPaymentsResultInterface>

}