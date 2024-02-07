'use strict'


import { QueryResult, Pool } from 'pg'

import VariableExpendsRepository from '../../domain/VariableExpends.repository'

import { ReadDayExpensesByProviderTypeInterface, ReadDayExpensesByProviderTypeResultInterface } from '../../domain/interfaces/ReadDayExpensesByProviderType.interface'
import { ReadWeekExpensesByProviderTypeInterface, ReadWeekExpensesByProviderTypeResultInterface } from '../../domain/interfaces/ReadWeekExpensesByProviderType.interface'
import { ReadMonthExpensesByProviderTypeInterface, ReadMonthExpensesByProviderTypeResultInterface } from '../../domain/interfaces/ReadMonthExpensesByProviderType.interface'
import { ReadYearExpensesByProviderTypeInterface, ReadYearExpensesByProviderTypeResultInterface } from '../../domain/interfaces/ReadYearExpensesByProviderType.interface'
import { ReadCommissionsByMonthInterface, ReadCommissionsByMonthResultInterface } from '../../domain/interfaces/ReadCommissionsByMonth.interface'
import { ReadCommissionsByYearInterface, ReadCommissionsByYearResultInterface } from '../../domain/interfaces/ReadCommissionsByYear.interface'
import { ReadCommissionsByDoctorInterface, ReadCommissionsByDoctorResultInterface } from '../../domain/interfaces/ReadCommisionsByDoctor.interface'
import { ReadMonthVariableExpendsInterface, ReadMonthVariableExpendsResultInterface } from '../../domain/interfaces/ReadMonthVariableExpends.interface'
import { ReadYearVariableExpendsInterface, ReadYearVariableExpendsResultInterface } from '../../domain/interfaces/ReadYearVariableExpends.interface'

import readDayExpensesByProviderTypeQuery from './querys/readDayExpensesByProviderType.query'
import readWeekExpensesByProviderTypeQuery from './querys/readWeekExpensesByProviderType.query'
import readMonthExpensesByProviderTypeQuery from './querys/readMonthExpensesByProviderType.query'
import readYearExpensesByProviderTypeQuery from './querys/readYearExpensesByProviderType.query'
import readCommissionsByMonthQuery from './querys/readCommissionsByMonth.query'
import readCommissionsByYearQuery from './querys/readCommissionsByYear.query'
import readCommissionsByDoctorQuery from './querys/readCommissionsByDoctor.query'
import readMonthVariableExpendsQuery from './querys/readMonthVariableExpends.query'
import readYearVariableExpendsQuery from './querys/readYearVariableExpends.query'


export default class  VariableExpendsModel implements VariableExpendsRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean
    ) {}
    async readDayExpensesByProviderType(data: ReadDayExpensesByProviderTypeInterface): Promise<ReadDayExpensesByProviderTypeResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.idProviderType,
                data.date
            ]
            const readDayExpensesByProviderTypeQueryResult = await this.db().query(readDayExpensesByProviderTypeQuery, values)
            const expenses = readDayExpensesByProviderTypeQueryResult.rows.map(element => {
                const modelResult: ReadDayExpensesByProviderTypeResultInterface = {
                    id: element.as_id_provider,
                    provider: element.title,
                    currency: element.currency_symbol,
                    amount: element.total
                }
                return modelResult
            })
            return expenses
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readDayExpensesByProviderType')
            throw error
        }
    }
    async readWeekExpensesByProviderType(data: ReadWeekExpensesByProviderTypeInterface): Promise<ReadWeekExpensesByProviderTypeResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.idProviderType,
                data.week,
                data.month,
                data.year
            ]
            const readWeekExpensesByProviderTypeQueryResult = await this.db().query(readWeekExpensesByProviderTypeQuery, values)
            const expenses = readWeekExpensesByProviderTypeQueryResult.rows.map(element => {
                const modelResult: ReadWeekExpensesByProviderTypeResultInterface = {
                    id: element.as_id_provider,
                    provider: element.title,
                    currency: element.currency_symbol,
                    amount: element.total
                }
                return modelResult
            })
            return expenses
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readWeekExpensesByProviderType')
            throw error
        }
    }
    async readMonthExpensesByProviderType(data: ReadMonthExpensesByProviderTypeInterface): Promise<ReadMonthExpensesByProviderTypeResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.idProviderType,
                data.month,
                data.year
            ]
            const readMonthExpensesByProviderTypeQueryResult = await this.db().query(readMonthExpensesByProviderTypeQuery, values)
            const expenses = readMonthExpensesByProviderTypeQueryResult.rows.map(element => {
                const modelResult: ReadMonthExpensesByProviderTypeResultInterface = {
                    id: element.as_id_provider,
                    provider: element.title,
                    currency: element.currency_symbol,
                    amount: element.total
                }
                return modelResult
            })
            return expenses
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readMonthExpensesByProviderType')
            throw error
        }
    }
    async readYearExpensesByProviderType(data: ReadYearExpensesByProviderTypeInterface): Promise<ReadYearExpensesByProviderTypeResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.idProviderType,
                data.year
            ]
            const readYearExpensesByProviderTypeQueryResult = await this.db().query(readYearExpensesByProviderTypeQuery, values)
            const expenses = readYearExpensesByProviderTypeQueryResult.rows.map(element => {
                const modelResult: ReadYearExpensesByProviderTypeResultInterface = {
                    id: element.as_id_provider,
                    provider: element.title,
                    currency: element.currency_symbol,
                    amount: element.total
                }
                return modelResult
            })
            return expenses
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readYearExpensesByProviderType')
            throw error
        }
    }
    async readCommissionsByMonth(data: ReadCommissionsByMonthInterface): Promise<ReadCommissionsByMonthResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.month,
                data.year
            ]
            const readCommissionsByMonthQueryResult = await this.db().query(readCommissionsByMonthQuery, values)
            const commissions = readCommissionsByMonthQueryResult.rows.map(element => {
                const modelResult: ReadCommissionsByMonthResultInterface = {
                    id: element.as_id_provider,
                    photo: element.photo,
                    doctor: element.as_doctor,
                    currency: element.currency_symbol,
                    amount: element.as_percentage
                }
                return modelResult
            })
            return commissions
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readCommissionsByMonth')
            throw error
        }
    }
    async readCommissionsByYear(data: ReadCommissionsByYearInterface): Promise<ReadCommissionsByYearResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.year
            ]
            const readCommissionsByYearQueryResult = await this.db().query(readCommissionsByYearQuery, values)
            const commissions = readCommissionsByYearQueryResult.rows.map(element => {
                const modelResult: ReadCommissionsByYearResultInterface = {
                    id: element.as_id_provider,
                    photo: element.photo,
                    doctor: element.as_doctor,
                    currency: element.currency_symbol,
                    amount: element.as_percentage
                }
                return modelResult
            })
            return commissions
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readCommissionsByYear')
            throw error
        }
    }
    async readCommissionsByDoctor(data: ReadCommissionsByDoctorInterface): Promise<ReadCommissionsByDoctorResultInterface[]> {
        try {
            const values = [
                data.idClinic,
                data.idCollaborator
            ]
            const readCommissionsByDoctorQueryResult = await this.db().query(readCommissionsByDoctorQuery, values)
            const commissions = readCommissionsByDoctorQueryResult.rows.map(element => {
                const modelResult: ReadCommissionsByDoctorResultInterface = {
                    id: element.as_id_provider,
                    treatment: element.treatment_name,
                    doctor: element.as_doctor,
                    date: element.created_at,
                    currency: element.currency_symbol,
                    amount: element.as_percentage
                }
                return modelResult
            })
            return commissions
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readCommissionsByDoctor')
            throw error
        }
    }
    async readMonthVariableExpends(data: ReadMonthVariableExpendsInterface): Promise<ReadMonthVariableExpendsResultInterface> {
        try {
            const values = [
                data.idClinic,
                data.month,
                data.year
            ]
            const readMonthVariableExpendsQueryResult = await this.db().query(readMonthVariableExpendsQuery, values)
            if(this.checkSelect(readMonthVariableExpendsQueryResult)) {
                const expense = readMonthVariableExpendsQueryResult.rows[0]
                const modelResult: ReadMonthVariableExpendsResultInterface = {
                    success: true,
                    currency: expense.currency_symbol,
                    dentalDeposits: expense.as_warehouse,
                    dentalLaboratories: expense.as_laboratory,
                    anotherSuppliers: expense.as_other,
                    commissions: expense.as_commission
                }
                return modelResult
            }
            const modelResult: ReadMonthVariableExpendsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readMonthVariableExpends')
            throw error
        }
    }
    async readYearVariableExpends(data: ReadYearVariableExpendsInterface): Promise<ReadYearVariableExpendsResultInterface> {
        try {
            const values = [
                data.idClinic,
                data.year
            ]
            const readYearVariableExpendsQueryResult = await this.db().query(readYearVariableExpendsQuery, values)
            if(this.checkSelect(readYearVariableExpendsQueryResult)) {
                const expense = readYearVariableExpendsQueryResult.rows[0]
                const modelResult: ReadYearVariableExpendsResultInterface = {
                    success: true,
                    currency: expense.currency_symbol,
                    dentalDeposits: expense.as_warehouse,
                    dentalLaboratories: expense.as_laboratory,
                    anotherSuppliers: expense.as_other,
                    commissions: expense.as_commission
                }
                return modelResult
            }
            const modelResult: ReadYearVariableExpendsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: VariableExpendsModel.readYearVariableExpends')
            throw error
        }
    }
}