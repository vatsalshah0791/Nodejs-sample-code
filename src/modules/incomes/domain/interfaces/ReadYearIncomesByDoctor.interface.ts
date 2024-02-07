'use strict'


export interface ReadYearIncomesByDoctorInterface {
    idClinic: string
    year: number
}


export interface ReadYearIncomesByDoctorResultInterface {
    id: string
    photo: string | null
    doctor: string
    currency: string
    data: number
}