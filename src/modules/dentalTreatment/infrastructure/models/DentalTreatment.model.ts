'use strict'


import { QueryResult, Pool } from 'pg'

import DentalTreatmentRepository from '../../domain/DentalTreatment.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CreateDentalTreatmentInterface, CreateDentalTreatmentResultInterface } from '../../domain/interfaces/CreateDentalTreatment.interface'
import { ReadDentalTreatmentsInterface, ReadDentalTreatmentsResultInterface } from '../../domain/interfaces/ReadDentalTreatments.interface'
import { UpdateDentalTreatmentInterface } from '../../domain/interfaces/UpdateDentalTreatment.interface'
import { DeleteDentalTreatmentInterface } from '../../domain/interfaces/DeleteDentalTreatment.interface'

import checkPlanTransactions from './transactions/checkPlan.transactions'
import createDentalTreatmentQuery from './querys/createDentalTreatment.query'
import readDentalTreatmentsQuery from './querys/readDentalTreatments.query'
import updateDentalTreatmentQuery from './querys/updateDentalTreatment.query'
import deleteDentalTreatmentQuery from './querys/deleteDentalTreatment.query'


export default class DentalTreatmentModel implements DentalTreatmentRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const [selectAppPlan, selectCountDentalTreatment] = checkPlanTransactions
            const values = [data.idClinic]
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountDentalTreatmentResult: QueryResult = await this.db().query(selectCountDentalTreatment, values)
            const availableDentalTreatment = selectAppPlanResult.rows[0].patients
            const dentalTreatmentCreated = selectCountDentalTreatmentResult.rows[0].total_dental_treatment
            if(availableDentalTreatment === -1) {
                return true
            }
            if(dentalTreatmentCreated >= availableDentalTreatment) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: DentalTreatmentModel.checkPlan')
            throw error
        }
    }
    async createDentalTreatment(data: CreateDentalTreatmentInterface): Promise<CreateDentalTreatmentResultInterface> {
        try {
            const values = [
                data.treatmentName,
                data.price,
                data.idSmClinic
            ]
            const createDentalTreatmentQueryResult: QueryResult = await this.db().query(createDentalTreatmentQuery, values)
            if(this.checkSelect(createDentalTreatmentQueryResult)) {
                const modelResult: CreateDentalTreatmentResultInterface = {
                    success: true,
                    id: createDentalTreatmentQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateDentalTreatmentResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: DentalTreatmentModel.createDentalTreatment')
            throw error
        }
    }
    async readDentalTreatments(data: ReadDentalTreatmentsInterface): Promise<ReadDentalTreatmentsResultInterface[]> {
        try {
            const values = [data.idClinic]
            const readDentalTreatmentsQueryResult: QueryResult = await this.db().query(readDentalTreatmentsQuery, values)
            const dentalTreatments = readDentalTreatmentsQueryResult.rows.map(element => {
                const newElement: ReadDentalTreatmentsResultInterface = {
                    id: element.id,
                    treatmentName: element.treatment_name,
                    price: element.price,
                    currency: element.currency_symbol
                }
                return newElement
            })
            return dentalTreatments
        } catch (error) {
            console.error('ERROR -- MODEL: DentalTreatmentModel.readDentalTreatments')
            throw error
        }
    }
    async updateDentalTreatment(data: UpdateDentalTreatmentInterface): Promise<boolean> {
        try {
            const values = [
                data.treatmentName,
                data.price,
                data.id
            ]
            const updateDentalTreatmentQueryResult: QueryResult = await this.db().query(updateDentalTreatmentQuery, values)
            return this.checkInsert(updateDentalTreatmentQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: DentalTreatmentModel.updateDentalTreatment')
            throw error
        }
    }
    async deleteDentalTreatment(data: DeleteDentalTreatmentInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteDentalTreatmentQueryResult: QueryResult = await this.db().query(deleteDentalTreatmentQuery, values)
            return this.checkInsert(deleteDentalTreatmentQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: DentalTreatmentModel.deleteDentalTreatment')
            throw error
        }
    }
}