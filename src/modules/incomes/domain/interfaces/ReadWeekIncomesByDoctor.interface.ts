'use strict'


export interface ReadWeekIncomesByDoctorInterface {
    idClinic: string
    week: number
    month: number
    year: number
}


export interface ReadWeekIncomesByDoctorResultInterface {
    id: string
    photo: string | null
    doctor: string
    currency: string
    data: number
}