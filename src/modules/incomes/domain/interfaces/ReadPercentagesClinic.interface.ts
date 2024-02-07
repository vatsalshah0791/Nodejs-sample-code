'use strict'


export interface ReadPercentagesClinicInterface {
    idClinic: string
    year: number
}


export interface ReadPercentagesClinicResultInterface {
    success: boolean
    total?: number
    projection?: number
    percentagesMonth?: number
    percentagesWeek?: number
    percentagesDay?: number
}