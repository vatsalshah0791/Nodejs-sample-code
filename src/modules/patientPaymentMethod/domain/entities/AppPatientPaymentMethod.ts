'use strict'


export default interface AppPatientPaymentMethod {
    id: string
    paymentMethod: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}