'use strict'


export default interface SmProvider {
    id: string
    title: string
    email: string
    fullAddress: string
    phonePrefix: string
    phone: string
    website: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppProviderType: string
    idSmClinic: string
}
