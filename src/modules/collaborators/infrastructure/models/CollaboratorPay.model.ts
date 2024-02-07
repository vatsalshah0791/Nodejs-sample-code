'use strict'


import { QueryResult, Pool, PoolClient } from 'pg'

import CollaboratorPayRepository from '../../domain/CollaboratorPay.repository'

import { CreateCollaboratorPayInterface, CreateCollaboratorPayResultInterface } from '../../domain/interfaces/CreateCollaboratorPay.interface'
import { CheckCollaboratorPayExistsInterface } from '../../domain/interfaces/CheckCollaboratorPayExists.interface'
import { ReadCollaboratorPaymentsInterface, ReadCollaboratorPaymentsResultInterface } from '../../domain/interfaces/ReadCollaboratorPayments.interface'

import createCollaboratorPayQuery from './querys/createCollaboratorPay.query'
import checkCollaboratorPayExistsQuery from './querys/checkCollaboratorPayExists.query'
import readCollaboratorPaymentsTransaction from './transactions/readCollaboratorPayments.transaction'


export default class CollaboratorPayModel implements CollaboratorPayRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkCollaboratorPayExists(data: CheckCollaboratorPayExistsInterface): Promise<boolean> {
        try {
            const values = [
                data.month,
                data.year,
                data.idSmCollaborator,
                data.idSmClinic
            ]
            const checkCollaboratorPayExistsQueryResult = await this.db().query(checkCollaboratorPayExistsQuery, values)
            return this.checkSelect(checkCollaboratorPayExistsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorPayModel.checkCollaboratorPayExists')
            throw error
        }
    }
    async createCollaboratorPay(data: CreateCollaboratorPayInterface): Promise<CreateCollaboratorPayResultInterface> {
        try {
            const values = [
                data.salary,
                data.commission,
                data.year,
                data.month,
                data.idSmCollaborator,
                data.idSmClinic
            ]
            const createCollaboratorPayQueryResult: QueryResult = await this.db().query(createCollaboratorPayQuery, values)
            if(this.checkInsert(createCollaboratorPayQueryResult)) {
                const modelResult: CreateCollaboratorPayResultInterface = {
                    success: true,
                    id: createCollaboratorPayQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateCollaboratorPayResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: CollaboratorPayModel.createCollaboratorPay')
            throw error
        }
    }
    async readCollaboratorPayments(data: ReadCollaboratorPaymentsInterface): Promise<ReadCollaboratorPaymentsResultInterface> {
        let client: PoolClient = await this.db().connect()
        try {
            const [selectSmClinic, selectSmCollaboratoPay] = readCollaboratorPaymentsTransaction
            await client.query('BEGIN')

            const values1 = [data.idSmClinic]
            const selectSmClinicResult: QueryResult = await client.query(selectSmClinic, values1)
            const clinic = selectSmClinicResult.rows[0]
            if(!this.checkSelect(selectSmClinicResult)) {
                await client.query('ROLLBACK')
                const modelResult: ReadCollaboratorPaymentsResultInterface = { success: false }
                return modelResult
            }

            const values2 = [
                data.idSmCollaborator,
                clinic.time_zone,
                data.idSmClinic,
                data.year
            ]
            const selectSmCollaboratoPayResult: QueryResult = await client.query(selectSmCollaboratoPay, values2)
            await client.query('COMMIT')

            const payments = selectSmCollaboratoPayResult.rows.map(element => ({
                id: element.id,
                salary: element.salary,
                commission: element.as_commission,
                month: element.as_month
            }))

            const graphSalaries: number[] = []
            selectSmCollaboratoPayResult.rows.forEach(element => {
                graphSalaries[parseInt(element.as_month) - 1] = element.salary
            })

            const graphCommissions: number[] = []
            selectSmCollaboratoPayResult.rows.forEach(element => {
                graphCommissions[parseInt(element.as_month) - 1] = element.as_commission
            })

            const modelResult: ReadCollaboratorPaymentsResultInterface = {
                success: true,
                currencySymbol: clinic.currency_symbol,
                payments,
                graphSalaries,
                graphCommissions
            }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: CollaboratorPayModel.readCollaboratorPay')
            throw error
        }
        finally {
            client.release()
        }
    }
}