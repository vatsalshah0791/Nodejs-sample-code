'use strict'


export default interface SmRentalExpense {
    id: string
    rentalName: string
    amount: number
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmClinic: string
}