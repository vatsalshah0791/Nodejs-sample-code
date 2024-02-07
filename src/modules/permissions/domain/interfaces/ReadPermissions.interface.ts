'use strict'


import SmPermission from '../entities/SmPermission'


export interface CollaboratorReadPermissionsInterface {
    idAccount: string
}

export interface AdminReadPermissionsInterface {
    id: SmPermission['idSmCollaborator']
}

export interface ReadPermissionsResultInterface {
    idSection: string
    sectionName: string
    canRead: SmPermission['canRead']
    canWrite: SmPermission['canWrite']
}