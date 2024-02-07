'use strict'


export default interface SmVerificationCode {
    id: string
    verificationCode: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmAccount: string
}