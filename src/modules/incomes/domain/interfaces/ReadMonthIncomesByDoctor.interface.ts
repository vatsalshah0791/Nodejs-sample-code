'use strict'


export interface ReadMonthIncomesByDoctorInterface {
    idClinic: string
    month: number
    year: number
}


export interface ReadMonthIncomesByDoctorResultInterface {
    id: string
    photo: string | null
    doctor: string
    currency: string
    data: number
}