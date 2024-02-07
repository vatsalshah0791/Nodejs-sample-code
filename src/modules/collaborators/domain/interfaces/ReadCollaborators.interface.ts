'use strict'


import SmCollaborator from '../entities/SmCollaborator'


export interface ReadCollaboratorsInterface {
    selectIdAppRole: number[]
    idAccount: string
}

export interface ReadCollaboratorsResultInterface {
    id: SmCollaborator['id']
    firstName: string
    lastName: string
    username: string
    email: SmCollaborator['email']
    phonePrefix: SmCollaborator['phonePrefix']
    phone: SmCollaborator['phone']
    isActive: boolean
    photo: string | null
    role: string
}