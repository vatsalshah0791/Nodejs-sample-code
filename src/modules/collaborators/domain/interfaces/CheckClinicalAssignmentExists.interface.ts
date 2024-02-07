'use strict'


import SmCollaboratorSmClinic from '../entities/SmCollaboratorSmClinic'


export interface CheckClinicalAssignmentExistsInterface {
    idCollaborator: SmCollaboratorSmClinic['idSmCollaborator']
    idClinic: SmCollaboratorSmClinic['idSmClinic']
}