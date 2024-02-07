'use strict'


export interface ReadMonthIncomesByTreatmentInterface {
    idClinic: string
    month: number
    year: number
}


export interface ReadMonthIncomesByTreatmentResultInterface {
    id: string
    treatment: string
    count: string
    currency: string
    data: number
}