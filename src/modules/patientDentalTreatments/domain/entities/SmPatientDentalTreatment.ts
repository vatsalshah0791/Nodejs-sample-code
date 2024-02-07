'use strict'


export default interface SmPatientDentalTreatment {
    id: string
    dentalPiece: number
    price: number
    discount: number
    total: number
    isDraft: boolean
    status: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmDentalTreatment: string
    idSmPatient: string
}