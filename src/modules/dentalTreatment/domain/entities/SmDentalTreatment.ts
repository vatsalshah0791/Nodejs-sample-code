'use strict'


export default interface SmDentalTreatment {
    id: string
    treatmentName: string
    price: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmClinic: string
}