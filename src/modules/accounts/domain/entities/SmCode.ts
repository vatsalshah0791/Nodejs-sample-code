'use strict'


export default interface SmCode {
    id: string
    code: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmAccount: string
}
