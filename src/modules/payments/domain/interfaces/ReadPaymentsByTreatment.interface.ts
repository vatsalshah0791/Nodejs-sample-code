'use strict'


import SmPay from '../entities/SmPay'


export interface ReadPaymentsByTreatmentInterface {
    idSmPatientDentalTreatment: SmPay['idSmPatientDentalTreatment']
}

export interface ReadPaymentsByTreatmentResultInterface {
    id: SmPay['id']
    currencySymbol: string
    amount: SmPay['amount'],
    paymentMethod: string
    doctor: string
    date: SmPay['createdAt']
}