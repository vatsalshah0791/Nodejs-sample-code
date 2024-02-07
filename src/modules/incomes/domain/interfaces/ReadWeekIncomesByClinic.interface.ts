'use strict'


export interface ReadWeekIncomesByClinicInterface {
    idClinic: string
    week: number
    month: number
    year: number
}


export interface ReadWeekIncomesByClinicResultInterface {
    date: string
    currency: string
    label: string
    data: number
}