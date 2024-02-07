'use strict'



export interface ReadCommissionsByDoctorInterface {
    idClinic: string
    idCollaborator: string
}


export interface ReadCommissionsByDoctorResultInterface {
    id: string
    treatment: PerformanceServerTiming
    doctor: string
    date: string
    currency: string
    amount: number
}