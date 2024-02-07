'use strict'


import SmPay from '../entities/SmPay'


export interface CreatePaymentInterface {
    amount: SmPay['amount']
    idAppPatientPaymentMethod: SmPay['idAppPatientPaymentMethod']
    idSmCollaborator: SmPay['idSmCollaborator']
    idSmPatientDentalTreatment: SmPay['idSmPatientDentalTreatment']
}

export interface CreatePaymentResultInterface {
    success: boolean
    id?: SmPay['id']
}