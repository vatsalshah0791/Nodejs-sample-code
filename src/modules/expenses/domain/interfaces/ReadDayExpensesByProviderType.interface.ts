'use strict'


export interface ReadDayExpensesByProviderTypeInterface {
    idClinic: string
    idProviderType: string
    date: Date
}


export interface ReadDayExpensesByProviderTypeResultInterface {
    id: string
    provider: string
    currency: string
    amount: number
}