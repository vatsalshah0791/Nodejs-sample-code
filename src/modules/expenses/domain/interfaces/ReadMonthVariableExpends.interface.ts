'use strict'


export interface ReadMonthVariableExpendsInterface {
    idClinic: string
    month: number
    year: number
}


export interface ReadMonthVariableExpendsResultInterface {
    success: boolean
    currency?: string
    dentalDeposits?: number
    dentalLaboratories?: number
    anotherSuppliers?: number
    commissions?: number
}