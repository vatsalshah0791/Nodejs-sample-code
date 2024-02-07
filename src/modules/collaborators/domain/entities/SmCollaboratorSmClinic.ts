'use strict'


export default interface SmCollaboratorSmClinic {
    id: string
    salary: number
    commission: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    idSmCollaborator: string
    idSmClinic: string
}