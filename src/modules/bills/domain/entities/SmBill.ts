'use strict'

export default interface SmBill {
    id: string
    noBill: string
    dateBill: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmProvider: string
    idSmClinic: string
}