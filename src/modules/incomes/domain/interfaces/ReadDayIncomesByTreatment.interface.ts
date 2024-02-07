'use strict'


export interface ReadDayIncomesByTreatmentInterface {
    idClinic: string
    date: Date
}


export interface ReadDayIncomesByTreatmentResultInterface {
    id: string
    treatment: string
    count: string
    currency: string
    data: number
}