'use strict'


export default interface AppRole {
    id: string
    roleName: string
    isCollaborator: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}