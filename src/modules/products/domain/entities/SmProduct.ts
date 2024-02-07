'use strict'


export default interface SmProduct {
    id: string
    productName: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmClinic: string
}