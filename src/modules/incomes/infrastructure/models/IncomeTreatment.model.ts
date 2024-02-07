'use strict'


import { QueryResult, Pool } from 'pg'

import IncomeTreatmentRepository from '../../domain/IncomeTreatment'

import { ReadDayIncomesByTreatmentInterface, ReadDayIncomesByTreatmentResultInterface } from '../../domain/interfaces/ReadDayIncomesByTreatment.interface'
import { ReadWeekIncomesByTreatmentInterface, ReadWeekIncomesByTreatmentResultInterface } from '../../domain/interfaces/ReadWeekIncomesByTreatment.interface'
import { ReadMonthIncomesByTreatmentInterface, ReadMonthIncomesByTreatmentResultInterface } from '../../domain/interfaces/ReadMonthIncomesByTreatment.interface'
import { ReadYearIncomesByTreatmentInterface, ReadYearIncomesByTreatmentResultInterface } from '../../domain/interfaces/ReadYearIncomesByTreatment.interface'

import readDayIncomesByTreatmentQuery from './querys/readDayIncomesByTreatment.query'
import readWeekIncomesByTreatmentQuery from './querys/readWeekIncomesByTreatment.query'
import readMonthIncomesByTreatmentQuery from './querys/readMonthIncomesByTreatment.query'
import readYearIncomesByTreatmentQuery from './querys/readYearIncomesByTreatment.query'


export default class IncomeTreatmentModel implements IncomeTreatmentRepository {
    constructor(private readonly db: () => Pool) {}
    async readDayIncomesByTreatment(data: ReadDayIncomesByTreatmentInterface): Promise<ReadDayIncomesByTreatmentResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.date
            ]
            const readDayIncomesByTreatmentQueryResult = await this.db().query(readDayIncomesByTreatmentQuery, values)
            const graph = readDayIncomesByTreatmentQueryResult.rows.map(element => {
                const newElement: ReadDayIncomesByTreatmentResultInterface = {
                    id: element.id,
                    treatment: element.treatment_name,
                    count: element.as_count,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeTreatmentModel.readDayIncomesByTreatment')
            throw error
        }
    }
    async readWeekIncomesByTreatment(data: ReadWeekIncomesByTreatmentInterface): Promise<ReadWeekIncomesByTreatmentResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.month,
                data.week,
                data.year
            ]
            const readWeekIncomesByTreatmentQueryResult = await this.db().query(readWeekIncomesByTreatmentQuery, values)
            const graph = readWeekIncomesByTreatmentQueryResult.rows.map(element => {
                const newElement: ReadWeekIncomesByTreatmentResultInterface = {
                    id: element.id,
                    treatment: element.treatment_name,
                    count: element.as_count,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeTreatmentModel.readWeekIncomesByTreatment')
            throw error
        }
    }
    async readMonthIncomesByTreatment(data: ReadMonthIncomesByTreatmentInterface): Promise<ReadMonthIncomesByTreatmentResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.year,
                data.month
            ]
            const readMonthIncomesByTreatmentQueryResult = await this.db().query(readMonthIncomesByTreatmentQuery, values)
            const graph = readMonthIncomesByTreatmentQueryResult.rows.map(element => {
                const newElement: ReadMonthIncomesByTreatmentResultInterface = {
                    id: element.id,
                    treatment: element.treatment_name,
                    count: element.as_count,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeTreatmentModel.readMonthIncomesByTreatment')
            throw error
        }
    }
    async readYearIncomesByTreatment(data: ReadYearIncomesByTreatmentInterface): Promise<ReadYearIncomesByTreatmentResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.year
            ]
            const readYearIncomesByTreatmentQueryResult = await this.db().query(readYearIncomesByTreatmentQuery, values)
            const graph = readYearIncomesByTreatmentQueryResult.rows.map(element => {
                const newElement: ReadYearIncomesByTreatmentResultInterface = {
                    id: element.id,
                    treatment: element.treatment_name,
                    count: element.as_count,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeTreatmentModel.readYearIncomesByTreatment')
            throw error
        }
    }
}