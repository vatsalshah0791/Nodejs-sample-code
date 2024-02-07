'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CheckUsernameExistsInterface } from './interfaces/CheckUsernameExists.interface'
import { CheckClinicalAssignmentExistsInterface } from './interfaces/CheckClinicalAssignmentExists.interface'
import { CreateCollaboratorInterface, CreateCollaboratorResultInterface } from './interfaces/CreateCollaborator.interface'
import { ReadCollaboratorsInterface, ReadCollaboratorsResultInterface } from './interfaces/ReadCollaborators.interface'
import { ReadCollaboratorInterface, ReadCollaboratorResultInterface } from './interfaces/ReadCollaborator.interface'
import { ReadAssignedByClinicInterface, ReadAssignedByClinicResultInterface } from './interfaces/ReadAssignedByClinic.interface'
import { ReadUnassignedByClinicInterface, ReadUnassignedByClinicResultInterface } from './interfaces/ReadUnassignedByClinic.interface'
import { AssingClinicInterface, AssingClinicResultInterface } from './interfaces/AssingClinic.interface'


export default interface CollaboratorRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    checkUsernameExists(data: CheckUsernameExistsInterface): Promise<boolean>

    checkClinicalAssignmentExists(data: CheckClinicalAssignmentExistsInterface): Promise<boolean>

    createCollaborator(data: CreateCollaboratorInterface): Promise<CreateCollaboratorResultInterface>

    readCollaborators(data: ReadCollaboratorsInterface): Promise<ReadCollaboratorsResultInterface[]>

    readCollaborator(data: ReadCollaboratorInterface): Promise<ReadCollaboratorResultInterface>

    readAssignedByClinic(data: ReadAssignedByClinicInterface): Promise<ReadAssignedByClinicResultInterface[]>

    readUnassignedByClinic(data: ReadUnassignedByClinicInterface): Promise<ReadUnassignedByClinicResultInterface[]>

    assingClinic(data: AssingClinicInterface): Promise<AssingClinicResultInterface>

}