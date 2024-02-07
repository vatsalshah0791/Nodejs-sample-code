'use strict'


export default interface SmAccessToken {
    id: string
    accessToken: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmAccount: string
}