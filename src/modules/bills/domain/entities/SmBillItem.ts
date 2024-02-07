'use strict'

export default interface SmBillItem {
    id: string
    amount: number
    unitPrice: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmProduct: string
    idSmBill: string
}