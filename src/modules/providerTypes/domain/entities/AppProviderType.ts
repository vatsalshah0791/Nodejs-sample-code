'use strict'


export default interface AppProviderType {
    id: string
    providerType: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}