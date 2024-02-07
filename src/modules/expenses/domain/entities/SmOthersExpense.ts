'use strict'


export default interface SmOtherExpense {
    id: string
    otherExpense: string
    amount: number
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmClinic: string
}