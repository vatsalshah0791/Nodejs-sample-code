'use strict'


import SmClinic from '../entities/SmClinic'


export interface UpdateClinicInterface {
    id: SmClinic['id']
    clinicName: SmClinic['clinicName']
    email: SmClinic['email']
    phonePrefix: SmClinic['phonePrefix']
    phone: SmClinic['phone']
    fullAddress: SmClinic['fullAddress']
    idAppCountry: SmClinic['idAppCountry']
    idAppTimeZone: SmClinic['idAppTimeZone']
    idAppCurrency: SmClinic['idAppCurrency']
}