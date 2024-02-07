'use strict'


import SmCollaboratorPay from '../entities/SmCollaboratorPay'


export interface CheckCollaboratorPayExistsInterface {
    month: number
    year: number
    idSmCollaborator: SmCollaboratorPay['idSmCollaborator']
    idSmClinic: SmCollaboratorPay['idSmClinic']
}