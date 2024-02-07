'use strict'


import SmPermission from '../entities/SmPermission'


export interface UpdatePermissionInterface {
    canRead: SmPermission['canRead']
    canWrite: SmPermission['canWrite']
    idSmCollaborator: SmPermission['idSmCollaborator']
    idAppSection: SmPermission['idAppSection']
}