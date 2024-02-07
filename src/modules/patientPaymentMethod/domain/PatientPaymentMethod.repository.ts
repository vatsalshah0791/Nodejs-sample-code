'use strict'


import { ReadPatientPaymentMethodResultInterface } from './interfaces/ReadPatientPaymentMethod.interface'


export default interface PatientPaymentMethodRepository {

    readPatientPaymentMethods(): Promise<ReadPatientPaymentMethodResultInterface[]>

}