'use strict'


import { QueryResult, Pool } from 'pg'

import IncomeDoctorRepository from '../../domain/IncomeDoctor.repository'

import { ReadDayIncomesByDoctorInterface, ReadDayIncomesByDoctorResultInterface } from '../../domain/interfaces/ReadDayIncomesByDoctor.interface'
import { ReadWeekIncomesByDoctorInterface, ReadWeekIncomesByDoctorResultInterface } from '../../domain/interfaces/ReadWeekIncomesByDoctor.interface'
import { ReadMonthIncomesByDoctorInterface, ReadMonthIncomesByDoctorResultInterface } from '../../domain/interfaces/ReadMonthIncomesByDoctor.interface'
import { ReadYearIncomesByDoctorInterface, ReadYearIncomesByDoctorResultInterface } from '../../domain/interfaces/ReadYearIncomesByDoctor.interface'

import readDayIncomesByDoctorQuery from './querys/readDayIncomesByDoctor.query'
import readWeekIncomesByDoctorQuery from './querys/readWeekIncomesByDoctor.query'
import readMonthIncomesByDoctorQuery from './querys/readMonthIncomesByDoctor.query'
import readYearIncomesByDoctorQuery from './querys/readYearIncomesByDoctor.query'


export default class IncomeDoctorModel implements IncomeDoctorRepository {
    constructor(private readonly db: () => Pool) {}
    async readDayIncomesByDoctor(data: ReadDayIncomesByDoctorInterface): Promise<ReadDayIncomesByDoctorResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.date
            ]
            const readDayIncomesByDoctorQueryResult = await this.db().query(readDayIncomesByDoctorQuery, values)
            const graph = readDayIncomesByDoctorQueryResult.rows.map(element => {
                const newElement: ReadDayIncomesByDoctorResultInterface = {
                    id: element.id,
                    photo: element.photo,
                    doctor: element.as_doctor,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeDoctorModel.readDayIncomesByDoctor')
            throw error
        }
    }
    async readWeekIncomesByDoctor(data: ReadWeekIncomesByDoctorInterface): Promise<ReadWeekIncomesByDoctorResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.week,
                data.month,
                data.year
            ]
            const readWeekIncomesByDoctorQueryResult = await this.db().query(readWeekIncomesByDoctorQuery, values)
            const graph = readWeekIncomesByDoctorQueryResult.rows.map(element => {
                const newElement: ReadWeekIncomesByDoctorResultInterface = {
                    id: element.id,
                    photo: element.photo,
                    doctor: element.as_doctor,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeDoctorModel.readWeekIncomesByDoctor')
            throw error
        }
    }
    async readMonthIncomesByDoctor(data: ReadMonthIncomesByDoctorInterface): Promise<ReadMonthIncomesByDoctorResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.year,
                data.month
            ]
            const readMonthIncomesByDoctorQueryResult = await this.db().query(readMonthIncomesByDoctorQuery, values)
            const graph = readMonthIncomesByDoctorQueryResult.rows.map(element => {
                const newElement: ReadMonthIncomesByDoctorResultInterface = {
                    id: element.id,
                    photo: element.photo,
                    doctor: element.as_doctor,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeDoctorModel.readMonthIncomesByDoctor')
            throw error
        }
    }
    async readYearIncomesByDoctor(data: ReadYearIncomesByDoctorInterface): Promise<ReadYearIncomesByDoctorResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.year
            ]
            const readYearIncomesByDoctorQueryResult = await this.db().query(readYearIncomesByDoctorQuery, values)
            const graph = readYearIncomesByDoctorQueryResult.rows.map(element => {
                const newElement: ReadYearIncomesByDoctorResultInterface = {
                    id: element.id,
                    photo: element.photo,
                    doctor: element.as_doctor,
                    currency: element.currency_symbol,
                    data: element.as_sum_amount
                }
                return newElement
            })
            return graph
        } catch (error) {
            console.error('ERROR -- MODEL: IncomeDoctorModel.readYearIncomesByDoctor')
            throw error
        }
    }
}