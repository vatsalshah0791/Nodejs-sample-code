'use strict'


import SmClinic from '../entities/SmClinic'


export interface ReadClinicInterface {
    id: SmClinic['id']
}

export interface ReadClinicResultInterface {
    success: boolean
    id?: SmClinic['id']
    clinicName?: SmClinic['clinicName']
    email?: SmClinic['email']
    phonePrefix?: SmClinic['phonePrefix']
    phone?: SmClinic['phone']
    fullAddress?: SmClinic['fullAddress']
    logo?: SmClinic['logo']
    idAppCountry?: SmClinic['idAppCountry']
    idAppTimeZone?: SmClinic['idAppTimeZone']
    idAppCurrency?: SmClinic['idAppCurrency']
}