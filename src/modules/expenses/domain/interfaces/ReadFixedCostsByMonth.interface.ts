'use strict'


export interface ReadFixedCostsByMonthInterface {
    idSmClinic: string
}


export interface ReadFixedCostsByMonthResultInterface {
    success: boolean
    currency?: string
    rental?: number
    wages?: number
    services?: number
    others?: number
}