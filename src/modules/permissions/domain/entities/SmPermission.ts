'use strict'

export default interface SmPermission {
    id: string
    canRead: boolean
    canWrite: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmCollaborator: string
    idAppSection: string
}