'use strict'


export default interface SmPatient {
    id: string
    email: string
    phonePrefix: string
    phone: string
    fullAddress: string
    workplace: string
    recommendedBy: string | null
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
    idSmCollaborator: string
    idSmClinic: string
}