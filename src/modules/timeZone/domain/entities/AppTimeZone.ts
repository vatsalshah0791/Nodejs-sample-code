'use strict'


export default interface AppTimeZone {
    id: string
    timeZone: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppCountry: string
}