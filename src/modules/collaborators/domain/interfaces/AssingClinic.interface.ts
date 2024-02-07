'use strict'


import SmCollaboratorSmClinic from '../entities/SmCollaboratorSmClinic'


export interface AssingClinicInterface {
    salary: SmCollaboratorSmClinic['salary']
    commission: SmCollaboratorSmClinic['commission']
    idCollaborator: SmCollaboratorSmClinic['idSmCollaborator']
    idClinic: SmCollaboratorSmClinic['idSmClinic']
}

export interface AssingClinicResultInterface {
    success: boolean
    id?: SmCollaboratorSmClinic['id']
}