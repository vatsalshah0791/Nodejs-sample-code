'use strict'


export default interface AppGender {
    id: string
    genderName: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}