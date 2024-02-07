'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CreateClinicInterface, CreateClinicResultInterface } from './interfaces/CreateClinic.interface'
import { ReadClinicInterface, ReadClinicResultInterface } from './interfaces/ReadClinic.interface'
import { ReadClinicsInterface, ReadClinicsResultInterface } from './interfaces/ReadClinics.interface'
import { ReadLogoKeyInterface, ReadLogoKeyResultInterface } from './interfaces/ReadLogoKey.interface'
import { ReadStaffStatisticsInterface, ReadStaffStatisticsResultInterface } from './interfaces/ReadStaffStatistics.interface'
import { UpdateClinicInterface } from './interfaces/UpdateClinic.interface'
import { UpdateLogoInterface } from './interfaces/UpdateLogo.interface'


export default interface ClinicRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    createClinic(data: CreateClinicInterface): Promise<CreateClinicResultInterface>

    readClinic(data: ReadClinicInterface): Promise<ReadClinicResultInterface>

    readClinicsByAdmin(data: ReadClinicsInterface): Promise<ReadClinicsResultInterface[]>

    readClinicsByCollaborator(data: ReadClinicsInterface): Promise<ReadClinicsResultInterface[]>

    readLogoKey(data: ReadLogoKeyInterface): Promise<ReadLogoKeyResultInterface>

    readStaffStatistics(data: ReadStaffStatisticsInterface): Promise<ReadStaffStatisticsResultInterface>

    updateClinic(data: UpdateClinicInterface): Promise<boolean>

    updateLogo(data: UpdateLogoInterface): Promise<boolean>

}