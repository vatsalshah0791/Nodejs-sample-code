'use strict'


export interface ReadMonthIncomesByClinicInterface {
    idClinic: string
    month: number
    year: number
}


export interface ReadMonthIncomesByClinicResultInterface {
    week: number
    month: number
    year: number
    currency: string
    label: string
    data: number
}