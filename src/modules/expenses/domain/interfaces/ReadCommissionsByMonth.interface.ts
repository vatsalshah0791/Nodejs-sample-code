'use strict'



export interface ReadCommissionsByMonthInterface {
    idClinic: string
    month: number
    year: number
}


export interface ReadCommissionsByMonthResultInterface {
    id: string
    photo: string | null
    doctor: string
    currency: string
    amount: number
}