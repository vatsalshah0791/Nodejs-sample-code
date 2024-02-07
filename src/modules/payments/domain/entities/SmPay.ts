'use strict'


export default interface SmPay {
    id: string
    amount: number
    commission: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppPatientPaymentMethod: string
    idSmCollaborator: string
    idSmPatientDentalTreatment: string
}