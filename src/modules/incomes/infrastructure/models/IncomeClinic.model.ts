'use strict'


import { QueryResult, Pool } from 'pg'

import IncomeClinicRepository from '../../domain/IncomeClinic.repository'

import { ReadPercentagesClinicInterface, ReadPercentagesClinicResultInterface } from '../../domain/interfaces/ReadPercentagesClinic.interface'
import { ReadDayIncomesByClinicInterface, ReadDayIncomesByClinicResultInterface } from '../../domain/interfaces/ReadDayIncomesByClinic.interface'
import { ReadWeekIncomesByClinicInterface, ReadWeekIncomesByClinicResultInterface } from '../../domain/interfaces/ReadWeekIncomesByClinic.interface'
import { ReadMonthIncomesByClinicInterface, ReadMonthIncomesByClinicResultInterface } from '../../domain/interfaces/ReadMonthIncomesByClinic.interface'
import { ReadYearIncomesByClinicInterface, ReadYearIncomesByClinicResultInterface } from '../../domain/interfaces/ReadYearIncomesByClinic.interface'

import readPercentagesQuery from './querys/readPercentages.query'
import readDayIncomesByClinicQuery from './querys/readDayIncomesByClinic.query'
import readWeekIncomesByClinicQuery from './querys/readWeekIncomesByClinic.query'
import readMonthIncomesByClinicQuery from './querys/readMonthIncomesByClinic.query'
import readYearIncomesByClinicQuery from './querys/readYearIncomesByClinic.query'


export default class IncomeClinicModel implements IncomeClinicRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean
    ) {}
    async readPercentagesByClinic(data: ReadPercentagesClinicInterface): Promise<ReadPercentagesClinicResultInterface> {
        try {
            const values = [
                data.idClinic,
                data.year,
                `${data.year}-12-31`,
                `${data.year}-01-01`
            ]
            const readPercentagesQueryResult = await this.db().query(readPercentagesQuery, values)
            if(this.checkSelect(readPercentagesQueryResult)) {
                const percentage = readPercentagesQueryResult.rows[0]
                const modelResult: ReadPercentagesClinicResultInterface = {
                    success: true,
                    total: percentage.as_year,
                    projection: percentage.as_projection,
                    percentagesMonth: percentage.as_month,
                    percentagesWeek: percentage.as_week,
                    percentagesDay: percentage.as_day
                }
                return modelResult
            }
            const modelResult: ReadPercentagesClinicResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeClinicModel.readPercentagesByClinic')
            throw error
        }
    }
    async readDayIncomesByClinic(data: ReadDayIncomesByClinicInterface): Promise<ReadDayIncomesByClinicResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.date
            ]
            const readDayIncomesByClinicQueryResult = await this.db().query(readDayIncomesByClinicQuery, values)
            const graph = readDayIncomesByClinicQueryResult.rows.map(element => {
                const newElement: ReadDayIncomesByClinicResultInterface = {
                    id: element.id,
                    photo: element.photo,
                    currency: element.currency_symbol,
                    label: element.as_patient,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeClinicModel.readDayIncomesByClinic')
            throw error
        }
    }
    async readWeekIncomesByClinic(data: ReadWeekIncomesByClinicInterface): Promise<ReadWeekIncomesByClinicResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.week,
                data.month,
                data.year
            ]
            const readWeekIncomesByClinicQueryResult = await this.db().query(readWeekIncomesByClinicQuery, values)
            const graph = readWeekIncomesByClinicQueryResult.rows.map(element => {
                const newElement: ReadWeekIncomesByClinicResultInterface = {
                    date: element.as_date,
                    currency: element.currency_symbol,
                    label: element.as_day,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeClinicModel.readWeekIncomesByClinic')
            throw error
        }
    }
    async readMonthIncomesByClinic(data: ReadMonthIncomesByClinicInterface): Promise<ReadMonthIncomesByClinicResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.month,
                data.year
            ]
            const readMonthIncomesByClinicQueryResult = await this.db().query(readMonthIncomesByClinicQuery, values)
            const graph = readMonthIncomesByClinicQueryResult.rows.map(element => {
                const newElement: ReadMonthIncomesByClinicResultInterface = {
                    week: element.as_week,
                    month: data.month,
                    year: data.year,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount,
                    label: element.as_label
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeClinicModel.readMonthIncomesByClinic')
            throw error
        }
    }
    async readYearIncomesByClinic(data: ReadYearIncomesByClinicInterface): Promise<ReadYearIncomesByClinicResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.year
            ]
            const readYearIncomesByClinicQueryResult = await this.db().query(readYearIncomesByClinicQuery, values)
            const graph: ReadYearIncomesByClinicResultInterface[] = []
            readYearIncomesByClinicQueryResult.rows.forEach(element => {
                graph[parseInt(element.as_month) - 1] = {
                    year: data.year,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount,
                    label: element.as_month
                }
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeClinicModel.readYearIncomesByClinic')
            throw error
        }
    }
}