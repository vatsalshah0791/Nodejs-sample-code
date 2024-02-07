'use strict'


export default interface SmAdmin {
    id: string
    email: string
    phonePrefix: string | null
    phone: string | null
    companyName: string
    birthDate: Date | null
    customerId: string | null
    subscriptionId: string | null
    planExpirationDate: Date | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppPlan: string
    idAppGender: string
    idAppCountry: string
    idSmAccount: string
}