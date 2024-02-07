'use strict'


export interface ReadYearIncomesByTreatmentInterface {
    idClinic: string
    year: number
}


export interface ReadYearIncomesByTreatmentResultInterface {
    id: string
    treatment: string
    count: string
    currency: string
    data: number
}