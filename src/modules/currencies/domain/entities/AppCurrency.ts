'use strict'


export default interface AppCurrency {
    id: string
    currencyName: string
    currencySymbol: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}