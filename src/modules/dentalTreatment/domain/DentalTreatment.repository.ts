'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CreateDentalTreatmentInterface, CreateDentalTreatmentResultInterface } from './interfaces/CreateDentalTreatment.interface'
import { ReadDentalTreatmentsInterface, ReadDentalTreatmentsResultInterface } from './interfaces/ReadDentalTreatments.interface'
import { UpdateDentalTreatmentInterface } from './interfaces/UpdateDentalTreatment.interface'
import { DeleteDentalTreatmentInterface } from './interfaces/DeleteDentalTreatment.interface'


export default interface DentalTreatmentRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    createDentalTreatment(data: CreateDentalTreatmentInterface): Promise<CreateDentalTreatmentResultInterface>

    readDentalTreatments(data: ReadDentalTreatmentsInterface): Promise<ReadDentalTreatmentsResultInterface[]>

    updateDentalTreatment(data: UpdateDentalTreatmentInterface): Promise<boolean>

    deleteDentalTreatment(data: DeleteDentalTreatmentInterface): Promise<boolean>

}