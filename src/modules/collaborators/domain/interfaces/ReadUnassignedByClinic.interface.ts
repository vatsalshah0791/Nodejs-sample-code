'use strict'


import SmCollaborator from '../entities/SmCollaborator'


export interface ReadUnassignedByClinicInterface {
    selectIdAppRole: number[]
    idClinic: string
}

export interface ReadUnassignedByClinicResultInterface {
    id?: SmCollaborator['id']
    firstName?: string
    lastName?: string
    username?: string
    photo?: string | null
    isActive?: boolean
    email?: SmCollaborator['email']
    phonePrefix?: SmCollaborator['phonePrefix']
    phone?: SmCollaborator['phone']
    role?: string
}