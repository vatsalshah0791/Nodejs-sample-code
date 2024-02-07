'use strict'


import SmPatient from '../entities/SmPatient'


export interface ReadPatientInterface {
    id: SmPatient['id']
}

export interface ReadPatientResultInterface {
    success: boolean
    id?: SmPatient['id']
    firstName?: string
    lastName?: string
    username?: string
    photo?: string | null
    email?: SmPatient['email']
    phonePrefix?: SmPatient['phonePrefix']
    phone?: SmPatient['phone']
    fullAddress?: SmPatient['fullAddress']
    workplace?: SmPatient['workplace']
    recommendedBy?: SmPatient['recommendedBy']
    birthDate?: SmPatient['birthDate']
    emergencyPhonePrefix?: SmPatient['emergencyPhonePrefix']
    emergencyPhone?: SmPatient['emergencyPhone']
    emergencyName?: SmPatient['emergencyName']
    createdAt?: SmPatient['createdAt']
    gender?: string
    idAppGender?: SmPatient['idAppGender']
    country?: string
    idAppCountry?: SmPatient['idAppCountry']
    doctorName?: string
    doctorUsername?: string
    idSmCollaborator?: SmPatient['idSmCollaborator']
    idSmClinic?: SmPatient['idSmClinic']
}