'use strict'


import SmCollaboratorPay from '../entities/SmCollaboratorPay'


export interface ReadCollaboratorPaymentsInterface {
    year: number
    idSmCollaborator: SmCollaboratorPay['idSmCollaborator']
    idSmClinic: SmCollaboratorPay['idSmClinic']
}


interface PaymentsInterface {
    id: SmCollaboratorPay['id']
    salary: SmCollaboratorPay['salary']
    commission: SmCollaboratorPay['commission']
    month: string
}
export interface ReadCollaboratorPaymentsResultInterface {
    success: boolean
    currencySymbol?: string
    payments?: PaymentsInterface[]
    graphSalaries?: number[]
    graphCommissions?: number[]
}