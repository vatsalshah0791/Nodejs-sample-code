'use strict'


export default interface SmClinic {
    id: string
    clinicName: string
    email: string
    phonePrefix: string
    phone: string
    fullAddress: string
    logo: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppCountry: string
    idAppTimeZone: string
    idAppCurrency: string
    idSmAdmin: string
}