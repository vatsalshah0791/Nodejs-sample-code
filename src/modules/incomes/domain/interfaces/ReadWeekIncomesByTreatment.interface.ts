'use strict'


export interface ReadWeekIncomesByTreatmentInterface {
    idClinic: string
    week: number
    month: number
    year: number
}


export interface ReadWeekIncomesByTreatmentResultInterface {
    id: string
    treatment: string
    count: string
    currency: string
    data: number
}