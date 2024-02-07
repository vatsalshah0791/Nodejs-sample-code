'use strict'


import { ValidatePaymentInterface } from './interfaces/ValidatePayment.interface'
import { CreatePaymentInterface, CreatePaymentResultInterface } from './interfaces/CreatePayment.interface'
import { ReadPaymentsByTreatmentInterface, ReadPaymentsByTreatmentResultInterface } from './interfaces/ReadPaymentsByTreatment.interface'
import { ReadPaymentsByPatientInterface, ReadPaymentsByPatientResultInterface } from './interfaces/ReadPaymentsByPatient.interface'


export default interface PayRepository {

    validatePayment(data: ValidatePaymentInterface): Promise<boolean>

    createPayment(data: CreatePaymentInterface): Promise<CreatePaymentResultInterface>

    readPaymentsByTreatment(data: ReadPaymentsByTreatmentInterface): Promise<ReadPaymentsByTreatmentResultInterface[]>

    readPaymentsByPatient(data: ReadPaymentsByPatientInterface): Promise<ReadPaymentsByPatientResultInterface[]>

}