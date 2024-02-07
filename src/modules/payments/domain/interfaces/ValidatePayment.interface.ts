'use strict'


import SmPay from '../entities/SmPay'


export interface ValidatePaymentInterface {
    idSmPatientDentalTreatment: string
    amount: SmPay['amount']
}