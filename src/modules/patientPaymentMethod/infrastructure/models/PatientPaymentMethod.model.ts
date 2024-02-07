'use strict'


import { QueryResult, Pool } from 'pg'

import PatientPaymentMethodRepository from '../../domain/PatientPaymentMethod.repository'

import { ReadPatientPaymentMethodResultInterface } from '../../domain/interfaces/ReadPatientPaymentMethod.interface'

import readPatientPaymentMethodsQuery from './querys/readPatientPaymentMethods.query'


export default class PatientPaymentMethodModel implements PatientPaymentMethodRepository {
    constructor(private readonly db: () => Pool) {}
    async readPatientPaymentMethods(): Promise<ReadPatientPaymentMethodResultInterface[]> {
        try {
            const readPatientPaymentMethodsQueryResult: QueryResult = await this.db().query(readPatientPaymentMethodsQuery)
            const patientPaymentMethods = readPatientPaymentMethodsQueryResult.rows.map(element => {
                const newElement: ReadPatientPaymentMethodResultInterface = {
                    id: element.id,
                    paymentMethod: element.payment_method
                }
                return newElement
            })
            return patientPaymentMethods
        } catch (error) {
            console.error('ERROR -- MODEL: PatientTreatmentPaymentMethodModel.readPatientPaymentMethods')
            throw error
        }
    }
}