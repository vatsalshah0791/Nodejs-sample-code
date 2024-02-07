'use strict'


import SmPatient from '../entities/SmPatient'


export interface ReadPatientsInterface {
    idClinic: string
}

export interface ReadPatientsResultInterface {
    id?: SmPatient['id']
    firstName?: string
    lastName?: string
    username?: string
    photo?: string | null
    email?: SmPatient['email']
    phonePrefix?: SmPatient['phonePrefix']
    phone?: SmPatient['phone']
    fullAddress?: SmPatient['fullAddress']
    createdAt?: SmPatient['createdAt']
    gender?: string
    country?: string
}