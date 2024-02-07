'use strict'


export interface ReadWeekExpensesByProviderTypeInterface {
    idClinic: string
    idProviderType: string
    week: number
    month: number
    year: number
}


export interface ReadWeekExpensesByProviderTypeResultInterface {
    id: string
    provider: string
    currency: string
    amount: number
}