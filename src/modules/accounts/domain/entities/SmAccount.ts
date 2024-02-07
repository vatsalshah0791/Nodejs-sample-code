'use strict'


export default interface SmAccount {
    id: string
    firstName: string
    lastName: string
    username: string
    realPassword: string
    oldPassword: string
    isActive: boolean
    isVerified: boolean
    photo: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idAppRole: string
    idAppLanguage: string
}