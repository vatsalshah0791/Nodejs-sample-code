'use strict'


export default interface SmDentalChair {
    id: string
    chairName: string
    isAvailable: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmClinic: string
}