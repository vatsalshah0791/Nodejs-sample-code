'use strict'


import SmPay from '../entities/SmPay'


export interface ReadPaymentsByPatientInterface {
    idPatient: string
}

export interface ReadPaymentsByPatientResultInterface {
    id: SmPay['id']
    currencySymbol: string
    amount: SmPay['amount']
    treatment: string
    paymentMethod: string
    date: SmPay['createdAt']
}