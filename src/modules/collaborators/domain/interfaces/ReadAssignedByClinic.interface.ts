'use strict'


import SmCollaborator from '../entities/SmCollaborator'
import SmCollaboratorSmClinic from '../entities/SmCollaboratorSmClinic'


export interface ReadAssignedByClinicInterface {
    selectIdAppRole: number[]
    idClinic: SmCollaboratorSmClinic['idSmClinic']
}

export interface ReadAssignedByClinicResultInterface {
    id?: SmCollaborator['id']
    firstName?: string
    lastName?: string
    username?: string
    photo?: string | null
    isActive?: boolean
    email?: SmCollaborator['email']
    phonePrefix?: SmCollaborator['phonePrefix']
    phone?: SmCollaborator['phone']
    salary?: SmCollaboratorSmClinic['salary']
    commission?: SmCollaboratorSmClinic['commission']
    role?: string
}