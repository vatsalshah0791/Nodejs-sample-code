'use strict'


import { QueryResult, Pool } from 'pg'

import PayRepository from '../../domain/Pay.repository'

import { ValidatePaymentInterface } from '../../domain/interfaces/ValidatePayment.interface'
import { CreatePaymentInterface, CreatePaymentResultInterface } from '../../domain/interfaces/CreatePayment.interface'
import { ReadPaymentsByTreatmentInterface, ReadPaymentsByTreatmentResultInterface } from '../../domain/interfaces/ReadPaymentsByTreatment.interface'
import { ReadPaymentsByPatientInterface, ReadPaymentsByPatientResultInterface } from '../../domain/interfaces/ReadPaymentsByPatient.interface'

import validatePaymentQuery from './querys/validatePayment.query'
import createPaymentQuery from './querys/createPayment.query'
import readPaymentsByTreatmentQuery from './querys/readPaymentsByTreatment.query'
import readPaymentsByPatientQuery from './querys/readPaymentsByPatient.query'


export default class PayModel implements PayRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async validatePayment(data: ValidatePaymentInterface): Promise<boolean> {
        try {
            const values = [data.idSmPatientDentalTreatment]
            const validatePaymentQueryResult: QueryResult = await this.db().query(validatePaymentQuery, values)
            if(!this.checkSelect(validatePaymentQueryResult)) {
                return false
            }
            const patientDentalTreatment = validatePaymentQueryResult.rows[0]
            if(patientDentalTreatment.total_pagado >= patientDentalTreatment.total) {
                return false
            }
            if((patientDentalTreatment.total_pagado + data.amount) > patientDentalTreatment.total) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: PayModel.validatePayment')
            throw error
        }
    }
    async createPayment(data: CreatePaymentInterface): Promise<CreatePaymentResultInterface> {
        try {
            const values = [
                data.amount,
                data.idAppPatientPaymentMethod,
                data.idSmCollaborator,
                data.idSmPatientDentalTreatment
            ]
            const createPaymentQueryResult: QueryResult = await this.db().query(createPaymentQuery, values)
            if(this.checkInsert(createPaymentQueryResult)) {
                const modelResult: CreatePaymentResultInterface = {
                    success: true,
                    id: createPaymentQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreatePaymentResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: PayModel.createPayment')
            throw error
        }
    }
    async readPaymentsByTreatment(data: ReadPaymentsByTreatmentInterface): Promise<ReadPaymentsByTreatmentResultInterface[]> {
        try {
            const values = [data.idSmPatientDentalTreatment]
            const readPaymentsByTreatmentQueryResult: QueryResult = await this.db().query(readPaymentsByTreatmentQuery, values)
            const payments = readPaymentsByTreatmentQueryResult.rows.map(element => {
                const newElement: ReadPaymentsByTreatmentResultInterface = {
                    id: element.id,
                    currencySymbol: element.currency_symbol,
                    amount: element.amount,
                    paymentMethod: element.payment_method,
                    doctor: element.as_doctor,
                    date: element.as_created_at
                }
                return newElement
            })
            return payments
        } catch (error) {
            console.error('ERROR -- MODEL: PayModel.readPaymentsByTreatment')
            throw error
        }
    }
    async readPaymentsByPatient(data: ReadPaymentsByPatientInterface): Promise<ReadPaymentsByPatientResultInterface[]> {
        try {
            const values = [data.idPatient]
            const readPaymentsByPatientQueryResult = await this.db().query(readPaymentsByPatientQuery, values)
            const payments = readPaymentsByPatientQueryResult.rows.map(element => {
                const newElement: ReadPaymentsByPatientResultInterface = {
                    id: element.id,
                    currencySymbol: element.currency_symbol,
                    amount: element.amount,
                    treatment: element.treatment_name,
                    paymentMethod: element.payment_method,
                    date: element.as_created_at
                }
                return newElement
            })
            return payments
        } catch (error) {
            console.error('ERROR -- MODEL: PayModel.readPaymentsByPatient')
            throw error
        }
    }
}