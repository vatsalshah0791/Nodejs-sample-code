'use strict'


export interface ReadYearExpensesByProviderTypeInterface {
    idClinic: string
    idProviderType: string
    year: number
}


export interface ReadYearExpensesByProviderTypeResultInterface {
    id: string
    provider: string
    currency: string
    amount: number
}