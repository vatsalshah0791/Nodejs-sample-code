'use strict'



export interface ReadCommissionsByYearInterface {
    idClinic: string
    year: number
}


export interface ReadCommissionsByYearResultInterface {
    id: string
    photo: string | null
    doctor: string
    currency: string
    amount: number
}