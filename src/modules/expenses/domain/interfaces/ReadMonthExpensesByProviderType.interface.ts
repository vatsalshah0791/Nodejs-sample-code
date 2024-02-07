'use strict'


export interface ReadMonthExpensesByProviderTypeInterface {
    idClinic: string
    idProviderType: string
    month: number
    year: number
}


export interface ReadMonthExpensesByProviderTypeResultInterface {
    id: string
    provider: string
    currency: string
    amount: number
}