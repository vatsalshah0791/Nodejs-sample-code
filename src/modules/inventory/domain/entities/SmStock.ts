'use strict'

export default interface SmStock {
    id: string
    stock: number
    unitPrice: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmProduct: string
    idSmClinic: string
}