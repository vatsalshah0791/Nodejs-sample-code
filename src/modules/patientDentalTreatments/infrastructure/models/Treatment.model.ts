'use strict'


import { QueryResult, PoolClient, Pool } from 'pg'

import PatientDentalTreatmentRepository from '../../domain/PatientDentalTreatment.repository'

import { CreatePatientDentalTreatmentInterface } from '../../domain/interfaces/CreatePatientDentalTreatment.interface'
import { ReadPatientDentalTreatmentsConfirmedInterface, ReadPatientDentalTreatmentsConfirmedResultInterface } from '../../domain/interfaces/ReadPatientDentalTreatmentsConfirmed.interface'
import { ReadPatientDentalTreatmentsDraftsInterface, ReadPatientDentalTreatmentsDraftsResultInterface } from '../../domain/interfaces/ReadPatientDentalTreatmentsDrafts.interface'
import { ConfirmPatientDentalTreatmentInterface } from '../../domain/interfaces/ConfirmPatientDentalTreatment.interface'
import { CancelPatientDentalTreatmentInterface } from '../../domain/interfaces/CancelPatientDentalTreatment.interface'
import { ToggleStatusPatientDentalTreatmentInterface } from '../../domain/interfaces/ToggleStatusPatientDentalTreatment.interface'

import createPatientDentalTreatmentQuery from './querys/createPatientDentalTreatment.query'
import readPatientDentalTreatmentsConfirmedQuery from './querys/readPatientDentalTreatmentsConfirmed.query'
import readPatientDentalTreatmentsDraftsQuery from './querys/readPatientDentalTreatmentsDrafts.query'
import confirmPatientDentalTreatmentQuery from './querys/confirmPatientDentalTreatment.query'
import cancelPatientDentalTreatmentQuery from './querys/cancelPatientDentalTreatment.query'
import toggleStatusPatientDentalTreatmentQuery from './querys/toggleStatusPatientDentalTreatment.query'


export default class PatientDentalTreatmentModel implements PatientDentalTreatmentRepository  {
    constructor(
        private readonly db: () => Pool,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async createPatientDentalTreatment(data: CreatePatientDentalTreatmentInterface): Promise<boolean> {
        let client: PoolClient = await this.db().connect()
        try {
            await client.query('BEGIN')
            for(const iterator of data.treatments) {
                let values = [
                    iterator.dentalPiece,
                    iterator.price,
                    data.discount,
                    data.isDraft,
                    iterator.idSmDentalTreatment,
                    data.idSmPatient
                ]
                await client.query(createPatientDentalTreatmentQuery, values)
            }
            await client.query('COMMIT')
            return true
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: PatientTreatmentModel.createPatientDentalTreatment')
            throw error
        }
        finally {
            client.release()
        }
    }
    async readPatientDentalTreatmentsConfirmed(data: ReadPatientDentalTreatmentsConfirmedInterface): Promise<ReadPatientDentalTreatmentsConfirmedResultInterface[]> {
        try {
            const values = [data.idPatient]
            const readPatientDentalTreatmentsConfirmedQueryResult: QueryResult = await this.db().query(readPatientDentalTreatmentsConfirmedQuery, values)
            const treatments = readPatientDentalTreatmentsConfirmedQueryResult.rows.map(element => {
                const newElement: ReadPatientDentalTreatmentsConfirmedResultInterface = {
                    id: element.id,
                    treatmentName: element.treatment_name,
                    dentalPiece: element.dental_piece,
                    currencySymbol: element.currency_symbol,
                    price: element.price,
                    discount: element.discount,
                    total: element.total,
                    totalPagado: element.total_pagado,
                    status: element.status,
                    createdAt: element.as_created_at,
                    updatedAt: element.as_updated_at
                }
                return newElement
            })
            return treatments
        } catch (error) {
            console.error('ERROR -- MODEL: PatientTreatmentModel.readPatientDentalTreatmentsConfirmed')
            throw error
        }
    }
    async readPatientDentalTreatmentsDrafts(data: ReadPatientDentalTreatmentsDraftsInterface): Promise<ReadPatientDentalTreatmentsDraftsResultInterface[]> {
        try {
            const values = [data.idPatient]
            const readPatientDentalTreatmentsDraftsQueryResult: QueryResult = await this.db().query(readPatientDentalTreatmentsDraftsQuery, values)
            const treatments = readPatientDentalTreatmentsDraftsQueryResult.rows.map(element => {
                const newElement: ReadPatientDentalTreatmentsDraftsResultInterface = {
                    id: element.id,
                    treatmentName: element.treatment_name,
                    dentalPiece: element.dental_piece,
                    currencySymbol: element.currency_symbol,
                    price: element.price,
                    discount: element.discount,
                    total: element.total,
                    createdAt: element.as_created_at,
                    updatedAt: element.as_updated_at
                }
                return newElement
            })
            return treatments
        } catch (error) {
            console.error('ERROR -- MODEL: PatientTreatmentModel.readPatientDentalTreatmentsDrafts')
            throw error
        }
    }
    async confirmPatientDentalTreatment(data: ConfirmPatientDentalTreatmentInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const confirmPatientDentalTreatmentQueryResult: QueryResult = await this.db().query(confirmPatientDentalTreatmentQuery, values)
            return this.checkInsert(confirmPatientDentalTreatmentQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PatientTreatmentModel.confirmPatientDentalTreatment')
            throw error
        }
    }
    async cancelPatientDentalTreatment(data: CancelPatientDentalTreatmentInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const cancelPatientDentalTreatmentQueryResult: QueryResult = await this.db().query(cancelPatientDentalTreatmentQuery, values)
            return this.checkInsert(cancelPatientDentalTreatmentQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PatientTreatmentModel.cancelPatientDentalTreatment')
            throw error
        }
    }
    async toggleStatusPatientDentalTreatment(data: ToggleStatusPatientDentalTreatmentInterface): Promise<boolean> {
        try {
            if(![1, 2, 3].includes(data.status)) {
                return false
            }
            const values = [
                data.status,
                data.id
            ]
            const toggleStatusPatientDentalTreatmentQueryResult: QueryResult = await this.db().query(toggleStatusPatientDentalTreatmentQuery, values)
            return this.checkInsert(toggleStatusPatientDentalTreatmentQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PatientTreatmentModel.toggleStatusPatientDentalTreatment')
            throw error
        }
    }
}