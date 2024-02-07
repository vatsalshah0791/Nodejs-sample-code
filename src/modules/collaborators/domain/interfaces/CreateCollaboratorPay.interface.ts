'use strict'


import SmCollaboratorPay from '../entities/SmCollaboratorPay'


export interface CreateCollaboratorPayInterface {
    salary: SmCollaboratorPay['salary']
    commission: SmCollaboratorPay['commission']
    month: number
    year: number
    idSmCollaborator: SmCollaboratorPay['idSmCollaborator']
    idSmClinic: SmCollaboratorPay['idSmClinic']
}

export interface CreateCollaboratorPayResultInterface {
    success: boolean
    id?: SmCollaboratorPay['id']
}