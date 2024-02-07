'use strict'


export default interface SmPhoto {
    id: string
    photo: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmPatient: string
}