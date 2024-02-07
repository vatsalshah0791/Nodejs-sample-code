'use strict'


import SmClinic from '../entities/SmClinic'


export interface CreateClinicInterface {
    clinicName: SmClinic['clinicName']
    email: SmClinic['email']
    phonePrefix: SmClinic['phonePrefix']
    phone: SmClinic['phone']
    fullAddress: SmClinic['fullAddress']
    logo: SmClinic['logo']
    idAppCountry: SmClinic['idAppCountry']
    idAppTimeZone: SmClinic['idAppTimeZone']
    idAppCurrency: SmClinic['idAppCurrency']
    idAccount: string
}

export interface CreateClinicResultInterface {
    success: boolean
    id?: SmClinic['id']
}