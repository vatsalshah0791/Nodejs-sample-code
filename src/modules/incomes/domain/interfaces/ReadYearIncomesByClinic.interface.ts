'use strict'


export interface ReadYearIncomesByClinicInterface {
    idClinic: string
    year: number
}


export interface ReadYearIncomesByClinicResultInterface {
    year: number
    currency: string
    label: string
    data: number
}