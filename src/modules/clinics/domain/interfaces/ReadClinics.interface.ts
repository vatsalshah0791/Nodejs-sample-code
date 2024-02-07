'use strict'


import SmClinic from '../entities/SmClinic'


export interface ReadClinicsInterface {
    idAccount: string
}

export interface ReadClinicsResultInterface {
    id: SmClinic['id']
    clinicName: SmClinic['clinicName']
    email: SmClinic['email']
    logo: SmClinic['logo']
    appointment?: {
        id?: string
        appointmentDate?: string
        startTime?: string
        endingTime?: string
        annotations?: string
        status?: number
        chair?: string
        doctor?: string
        treatment?: string
        price?: number
        email?: string
        phonePrefix?: string
        phone?: string
        photo?: string | null
        patient?: string
        idSmDentalChair?: string
        idSmCollaborator?: string
        idSmDentalTreatment?: string
        idSmPatient?: string
    } | null
}
