'use strict'


export default interface SmCollaborator {
    id: string
    email: string
    phonePrefix: string
    phone: string
    fullAddress: string
    birthDate: Date
    emergencyPhonePrefix: string
    emergencyPhone: string
    emergencyName: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppGender: string
    idAppCountry: string
    idSmAccount: string
    idSmAdmin: string
}