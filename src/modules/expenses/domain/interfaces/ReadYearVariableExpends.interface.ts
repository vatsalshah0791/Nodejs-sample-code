'use strict'


export interface ReadYearVariableExpendsInterface {
    idClinic: string
    year: number
}


export interface ReadYearVariableExpendsResultInterface {
    success: boolean
    currency?: string
    dentalDeposits?: number
    dentalLaboratories?: number
    anotherSuppliers?: number
    commissions?: number
}