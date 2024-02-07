'use strict'


import { CreatePatientDentalTreatmentInterface } from './interfaces/CreatePatientDentalTreatment.interface'
import { ReadPatientDentalTreatmentsConfirmedInterface, ReadPatientDentalTreatmentsConfirmedResultInterface } from './interfaces/ReadPatientDentalTreatmentsConfirmed.interface'
import { ReadPatientDentalTreatmentsDraftsInterface, ReadPatientDentalTreatmentsDraftsResultInterface } from './interfaces/ReadPatientDentalTreatmentsDrafts.interface'
import { ConfirmPatientDentalTreatmentInterface } from './interfaces/ConfirmPatientDentalTreatment.interface'
import { CancelPatientDentalTreatmentInterface } from './interfaces/CancelPatientDentalTreatment.interface'
import { ToggleStatusPatientDentalTreatmentInterface } from './interfaces/ToggleStatusPatientDentalTreatment.interface'


export default interface PatientDentalTreatmentRepository {

    createPatientDentalTreatment(data: CreatePatientDentalTreatmentInterface): Promise<boolean>

    readPatientDentalTreatmentsConfirmed(data: ReadPatientDentalTreatmentsConfirmedInterface): Promise<ReadPatientDentalTreatmentsConfirmedResultInterface[]>

    readPatientDentalTreatmentsDrafts(data: ReadPatientDentalTreatmentsDraftsInterface): Promise<ReadPatientDentalTreatmentsDraftsResultInterface[]>

    confirmPatientDentalTreatment(data: ConfirmPatientDentalTreatmentInterface): Promise<boolean>

    cancelPatientDentalTreatment(data: CancelPatientDentalTreatmentInterface): Promise<boolean>

    toggleStatusPatientDentalTreatment(data: ToggleStatusPatientDentalTreatmentInterface): Promise<boolean>

}