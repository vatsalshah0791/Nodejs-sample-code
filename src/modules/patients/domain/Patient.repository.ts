'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CheckUsernameExistsInterface } from './interfaces/CheckUsernameExists.interface'
import { CreatePatientInterface, CreatePatientResultInterface } from './interfaces/CreatePatient.interface'
import { ReadPatientsInterface, ReadPatientsResultInterface } from './interfaces/ReadPatients.interface'
import { ReadPatientInterface, ReadPatientResultInterface } from './interfaces/ReadPatient.interface'
import { ReadPhotoKeyInterface, ReadPhotoKeyResultInterface } from './interfaces/ReadPhotoKey.interface'
import { ReadPatientsStatisticsInterface, ReadPatientsStatisticsResultInterface } from './interfaces/ReadPatientsStatistics.interface'
import { UpdatePatientInterface } from './interfaces/UpdatePatient.interface'
import { UpdatePhotoInterface } from './interfaces/UpdatePhoto.interface'


export default interface PatientRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    checkUsernameExists(data: CheckUsernameExistsInterface): Promise<boolean>

    createPatient(data: CreatePatientInterface): Promise<CreatePatientResultInterface>

    readPatients(data: ReadPatientsInterface): Promise<ReadPatientsResultInterface[]>

    readPatient(data: ReadPatientInterface): Promise<ReadPatientResultInterface>

    readPhotoKey(data: ReadPhotoKeyInterface): Promise<ReadPhotoKeyResultInterface>

    readPatientsStatistics(data: ReadPatientsStatisticsInterface): Promise<ReadPatientsStatisticsResultInterface>

    updatePatient(data: UpdatePatientInterface): Promise<boolean>

    updatePhoto(data: UpdatePhotoInterface): Promise<boolean>

}