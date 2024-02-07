'use strict'


export default interface AppCountry {
    id: string
    countryName: string
    countryCode: string
    countryFlag: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}