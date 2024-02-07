'use strict'


export interface ReadDayIncomesByClinicInterface {
    idClinic: string
    date: Date
}


export interface ReadDayIncomesByClinicResultInterface {
    id: string
    photo: string | null
    currency: string
    label: string
    data: number
}