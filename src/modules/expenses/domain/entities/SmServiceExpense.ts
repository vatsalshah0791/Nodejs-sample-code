'use strict'


export default interface SmServiceExpense {
    id: string
    serviceName: string
    amount: number
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmClinic: string
}