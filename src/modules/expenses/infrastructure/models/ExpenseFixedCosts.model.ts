'use strict'


import { QueryResult, Pool } from 'pg'

import ExpenseFixedCostsRepository from '../../domain/ExpenseFixedCosts.repository'

import { CreateRentalExpenseInterface, CreateRentalExpenseResultInterface } from '../../domain/interfaces/CreateRentalExpense.interface'
import { CreateServiceExpenseInterface, CreateServiceExpenseResultInterface } from '../../domain/interfaces/CreateServiceExpense.interface'
import { CreateOtherExpenseInterface, CreateOtherExpenseResultInterface } from '../../domain/interfaces/CreateOtherExpense.interface'
import { ReadRentalExpensesInterface, ReadRentalExpensesResultInterface } from '../../domain/interfaces/ReadRentalExpenses.interface'
import { ReadWagesInterface, ReadWagesResultInterface } from '../../domain/interfaces/ReadWages.interface'
import { ReadServiceExpensesInterface, ReadServiceExpensesResultInterface } from '../../domain/interfaces/ReadServiceExpenses.interface'
import { ReadOtherExpensesInterface, ReadOtherExpensesResultInterface } from '../../domain/interfaces/ReadOtherExpenses.interface'
import { ReadFixedCostsByMonthInterface, ReadFixedCostsByMonthResultInterface } from '../../domain/interfaces/ReadFixedCostsByMonth.interface'
import { UpdateRentalExpenseInterface } from '../../domain/interfaces/UpdateRentalExpense.interface'
import { UpdateServiceExpenseInterface } from '../../domain/interfaces/UpdateServiceExpense.interface'
import { UpdateOtherExpenseInterface } from '../../domain/interfaces/UpdateOtherExpense.interface'
import { DeleteRentalExpenseInterface } from '../../domain/interfaces/DeleteRentalExpense.interface'
import { DeleteServiceExpenseInterface } from '../../domain/interfaces/DeleteServiceExpense.interface'
import { DeleteOtherExpenseInterface } from '../../domain/interfaces/DeleteOtherExpense.interface'

import createRentalExpenseQuery from './querys/createRentalExpense.query'
import createServiceExpenseQuery from './querys/createServiceExpense.query'
import createOtherExpenseQuery from './querys/createOtherExpense.query'
import readRentalExpensesQuery from './querys/readRentalExpenses.query'
import readWagesQuery from './querys/readWages.query'
import readServiceExpensesQuery from './querys/readServiceExpenses.query'
import readOtherExpensesQuery from './querys/readOtherExpenses.query'
import readFixedCostsByMonthQuery from './querys/readFixedCostsByMonth.query'
import updateRentalExpenseQuery from './querys/updateRentalExpense.query'
import updateServiceExpenseQuery from './querys/updateServiceExpense.query'
import updateOtherExpenseQuery from './querys/updateOtherExpense.query'
import deleteRentalExpenseQuery from './querys/deleteRentalExpense.query'
import deleteServiceExpenseQuery from './querys/deleteServiceExpense.query'
import deleteOtherExpenseQuery from './querys/deleteOtherExpense.query'


export default class ExpenseFixedCostsModel implements ExpenseFixedCostsRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async createRentalExpense(data: CreateRentalExpenseInterface): Promise<CreateRentalExpenseResultInterface> {
        try {
            const values = [
                data.rentalName,
                data.amount,
                data.isAvailable,
                data.idSmClinic
            ]
            const createRentalExpenseQueryResult = await this.db().query(createRentalExpenseQuery, values)
            if(this.checkInsert(createRentalExpenseQueryResult)) {
                const modelResult: CreateRentalExpenseResultInterface = {
                    success: true,
                    id: createRentalExpenseQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateRentalExpenseResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.createRentalExpense')
            throw error
        }
    }
    async createServiceExpense(data: CreateServiceExpenseInterface): Promise<CreateServiceExpenseResultInterface> {
        try {
            const values = [
                data.serviceName,
                data.amount,
                data.isAvailable,
                data.idSmClinic
            ]
            const createServiceExpenseQueryResult = await this.db().query(createServiceExpenseQuery, values)
            if(this.checkInsert(createServiceExpenseQueryResult)) {
                const modelResult: CreateServiceExpenseResultInterface = {
                    success: true,
                    id: createServiceExpenseQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateServiceExpenseResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.createServiceExpense')
            throw error
        }
    }
    async createOtherExpense(data: CreateOtherExpenseInterface): Promise<CreateOtherExpenseResultInterface> {
        try {
            const values = [
                data.otherExpense,
                data.amount,
                data.isAvailable,
                data.idSmClinic
            ]
            const createOtherExpenseQueryResult = await this.db().query(createOtherExpenseQuery, values)
            if(this.checkInsert(createOtherExpenseQueryResult)) {
                const modelResult: CreateOtherExpenseResultInterface = {
                    success: true,
                    id: createOtherExpenseQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateOtherExpenseResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.createOtherExpense')
            throw error
        }
    }
    async readRentalExpenses(data: ReadRentalExpensesInterface): Promise<ReadRentalExpensesResultInterface[]> {
        try {
            const values = [data.idSmClinic]
            const readRentalExpensesQueryResult = await this.db().query(readRentalExpensesQuery, values)
            const rentalExpenses = readRentalExpensesQueryResult.rows.map(element => {
                const newElement: ReadRentalExpensesResultInterface = {
                    id: element.id,
                    rentalName: element.rental_name,
                    currency: element.currency_symbol,
                    amount: element.amount,
                    isAvailable: element.is_available
                }
                return newElement
            })
            return rentalExpenses
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.readRentalExpenses')
            throw error
        }
    }
    async readWages(data: ReadWagesInterface): Promise<ReadWagesResultInterface[]> {
        try {
            const values = [data.idSmClinic]
            const readWagesQueryResult = await this.db().query(readWagesQuery, values)
            const wages = readWagesQueryResult.rows.map(element => {
                const newElement: ReadWagesResultInterface = {
                    name: element.as_name,
                    currency: element.currency_symbol,
                    salary: element.salary
                }
                return newElement
            })
            return wages
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.readWages')
            throw error
        }
    }
    async readServiceExpenses(data: ReadServiceExpensesInterface): Promise<ReadServiceExpensesResultInterface[]> {
        try {
            const values = [data.idSmClinic]
            const readServiceExpensesQueryResult = await this.db().query(readServiceExpensesQuery, values)
            const servicesExpenses = readServiceExpensesQueryResult.rows.map(element => {
                const newElement: ReadServiceExpensesResultInterface = {
                    id: element.id,
                    serviceName: element.service_name,
                    currency: element.currency_symbol,
                    amount: element.amount,
                    isAvailable: element.is_available
                }
                return newElement
            })
            return servicesExpenses
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.readServiceExpenses')
            throw error
        }
    }
    async readOtherExpenses(data: ReadOtherExpensesInterface): Promise<ReadOtherExpensesResultInterface[]> {
        try {
            const values = [data.idSmClinic]
            const readOtherExpensesQueryResult = await this.db().query(readOtherExpensesQuery, values)
            const otherExpenses = readOtherExpensesQueryResult.rows.map(element => {
                const newElement: ReadOtherExpensesResultInterface = {
                    id: element.id,
                    otherExpense: element.other_expense,
                    currency: element.currency_symbol,
                    amount: element.amount,
                    isAvailable: element.is_available
                }
                return newElement
            })
            return otherExpenses
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.readOtherExpenses')
            throw error
        }
    }
    async readFixedCostsByMonth(data: ReadFixedCostsByMonthInterface): Promise<ReadFixedCostsByMonthResultInterface> {
        try {
            const values = [data.idSmClinic]
            const readFixedCostsByMonthQueryResult = await this.db().query(readFixedCostsByMonthQuery, values)
            if(this.checkSelect(readFixedCostsByMonthQueryResult)) {
                const fixedCosts = readFixedCostsByMonthQueryResult.rows[0]
                const modelResult: ReadFixedCostsByMonthResultInterface = {
                    success: false,
                    currency: fixedCosts.as_currency,
                    rental: fixedCosts.as_rental,
                    wages: fixedCosts.as_wages,
                    services: fixedCosts.as_service,
                    others: fixedCosts.as_other
                }
                return modelResult
            }
            const modelResult: ReadFixedCostsByMonthResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.readFixedCostsByMonth')
            throw error
        }
    }
    async updateRentalExpense(data: UpdateRentalExpenseInterface): Promise<boolean> {
        try {
            const values = [
                data.rentalName,
                data.amount,
                data.isAvailable,
                data.id
            ]
            const updateRentalExpenseQueryResult = await this.db().query(updateRentalExpenseQuery, values)
            return this.checkInsert(updateRentalExpenseQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.updateRentalExpense')
            throw error
        }
    }
    async updateServiceExpense(data: UpdateServiceExpenseInterface): Promise<boolean> {
        try {
            const values = [
                data.serviceName,
                data.amount,
                data.isAvailable,
                data.id
            ]
            const updateServiceExpenseQueryResult = await this.db().query(updateServiceExpenseQuery, values)
            return this.checkInsert(updateServiceExpenseQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.updateServiceExpense')
            throw error
        }
    }
    async updateOtherExpense(data: UpdateOtherExpenseInterface): Promise<boolean> {
        try {
            const values = [
                data.otherExpense,
                data.amount,
                data.isAvailable,
                data.id
            ]
            const updateOtherExpenseQueryResult = await this.db().query(updateOtherExpenseQuery, values)
            return this.checkInsert(updateOtherExpenseQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.updateOtherExpense')
            throw error
        }
    }
    async deleteRentalExpense(data: DeleteRentalExpenseInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteRentalExpenseQueryResult = await this.db().query(deleteRentalExpenseQuery, values)
            return this.checkInsert(deleteRentalExpenseQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.deleteRentalExpense')
            throw error
        }
    }
    async deleteServiceExpense(data: DeleteServiceExpenseInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteServiceExpenseQueryResult = await this.db().query(deleteServiceExpenseQuery, values)
            return this.checkInsert(deleteServiceExpenseQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.deleteServiceExpense')
            throw error
        }
    }
    async deleteOtherExpense(data: DeleteOtherExpenseInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteOtherExpenseQueryResult = await this.db().query(deleteOtherExpenseQuery, values)
            return this.checkInsert(deleteOtherExpenseQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ExpenseFixedCostsModel.deleteOtherExpense')
            throw error
        }
    }
}