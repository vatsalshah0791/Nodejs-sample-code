'use strict'


export interface ReadDayIncomesByDoctorInterface {
    idClinic: string
    date: Date
}


export interface ReadDayIncomesByDoctorResultInterface {
    id: string
    photo: string | null
    doctor: string
    currency: string
    data: number
}